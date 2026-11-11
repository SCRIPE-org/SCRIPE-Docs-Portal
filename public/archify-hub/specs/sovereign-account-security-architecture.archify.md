# How does SCRIPE enforce Sovereign Account Security, Passkeys, and Perimeter Isolation? {#sovereign-account-security}

SCRIPE protects administrative access through **W3C WebAuthn Level 3 Passkeys**, **Enterprise SSO Identity Federation**, and **Subnet CIDR Perimeter Enforcement**.[](source:w3c_webauthn)

- Hardware passkeys eliminate credential theft via unpadded Base64Url normalization (RFC 4648 §5) and FIDO2 AAGUID model resolution.[](source:rfc4648)
- `PasskeyController` and `Fido2WebAuthnService` verify CBOR attestation and COSE public keys with zero external cloud dependencies.[](source:fido2_ctap2)
- Enterprise SSO (`/api/v1/auth/admin/external-logins`) binds OIDC and SAML 2.0 identities with audit logging and single-click unlinking.[](source:oidc_core)
- Trusted CIDR allowlists restrict administrative operations to designated workstation subnets with 15-minute biometric sudo step-up.[](source:account_security_view)

@answer scope="W3C WebAuthn Level 3 · RFC 4648 §5 · Dual-Mode SSO Federation · CIDR Perimeter · 15-Min Biometric Sudo"
@meta locale=en style=editorial quality_profile=showcase
@source w3c_webauthn title="W3C WebAuthn Level 3 Recommendation" url=https://www.w3.org/TR/webauthn-3/
@source rfc4648 title="RFC 4648 §5: Base64URL with No Padding" url=https://www.rfc-editor.org/rfc/rfc4648#section-5
@source fido2_ctap2 title="FIDO2 CTAP 2.1 Authenticator Specifications" url=https://fidoalliance.org/specs/fido-v2.1-rd-20210309/fido-client-to-authenticator-protocol-v2.1-rd-20210309.html
@source oidc_core title="OpenID Connect Core 1.0 Identity Federation" url=https://openid.net/specs/openid-connect-core-1_0.html
@source account_security_view title="SCRIPE Sovereign Account Security Portal (/account/security)" url=https://docs.scripe.org/account/security

## How does the W3C WebAuthn Level 3 ceremony register and authenticate hardware passkeys? {#passkey-ceremony}

@sequence id=passkey-ceremony-seq title="W3C WebAuthn Level 3 Registration and Assertion Ceremony"
| actor user | Administrator | external |
| actor client | WebAuthn Browser API | frontend |
| actor gateway | PasskeyController API | backend |
| actor fido2 | Fido2WebAuthnService | security |
| actor storage | Passkey & Challenge DB | database |
| phase | 1. Registration Ceremony (navigator.credentials.create) |
| user | client | Initiate Passkey Registration | emphasis |
| client | gateway | POST /registration/begin (JWT) |
| gateway | fido2 | BeginRegistrationAsync(adminId, rpId) |
| fido2 | storage | Store 32-Byte Challenge (5m TTL) |
| storage | fido2 | Challenge Stored | return |
| fido2 | gateway | CreationOptions (ES256, RS256, EdDSA) | return |
| gateway | client | 200 OK Creation Options | return |
| client | user | Prompt Sensor Touch / Enclave KeyGen | security |
| user | client | Touch ID / Windows Hello / Token Touch | return |
| client | gateway | POST /registration/complete (Attestation + ClientData) | emphasis |
| gateway | fido2 | CompleteRegistrationAsync(attestation, clientData) | security |
| fido2 | storage | Persist AdminPasskey (COSE Key, SignCount, AAGUID) |
| storage | gateway | AdminPasskey Saved | return |
| gateway | client | 201 Created Passkey Registered | return |
| phase | 2. Passwordless Assertion Ceremony (navigator.credentials.get) |
| user | client | Initiate Passwordless Login | emphasis |
| client | gateway | POST /authentication/begin (RP ID) |
| gateway | fido2 | BeginAuthenticationAsync() |
| fido2 | gateway | PublicKeyCredentialRequestOptions | return |
| gateway | client | 200 OK Assertion Options | return |
| client | user | Prompt Biometric or Hardware Assertion | security |
| user | client | User Verified / Enclave Signs Challenge | return |
| client | gateway | POST /authentication/verify (Assertion + Signature) | emphasis |
| gateway | fido2 | VerifyAssertionAsync(challenge, signature, signCount) | security |
| fido2 | gateway | Assertion Verified (Clone Counter Valid) | return |
| gateway | client | 200 OK Access Granted (JWT + Refresh Cookie) | return |

@steps id=passkey-steps
| st_reg_begin | Initiate Registration | Client requests creation options and receives a cryptographically secure 32-byte challenge. | passkey-ceremony-seq | gateway |
| st_bio_scan | Biometric Sensor Touch | Device hardware generates a fresh asymmetric keypair inside the secure enclave. | passkey-ceremony-seq | client |
| st_reg_complete | Verify Attestation | Backend validates CBOR attestation, extracts the COSE public key, and stores the initial sign counter. | passkey-ceremony-seq | fido2 |
| st_auth_begin | Request Assertion Challenge | Passwordless login begins with a fresh server challenge and allowed credential descriptors. | passkey-ceremony-seq | gateway |
| st_auth_verify | Validate Assertion Signature | Server verifies the assertion signature against the stored public key and confirms signCount increased. | passkey-ceremony-seq | fido2 |

## How does WebAuthnChallengeHelper normalize RFC 4648 §5 challenges and resolve hardware AAGUIDs? {#challenge-normalization-aaguid}

@facts id=webauthn-spec-invariants
| Standard Specification | W3C WebAuthn Level 3 (Recommendation) & FIDO2 CTAP 2.1 |
| Challenge Encoding | RFC 4648 §5 unpadded Base64Url (`-`, `_`, stripped `=`) |
| Supported Cryptography | COSE -7 (ES256 ECDSA P-256), -257 (RS256 RSA 2048), -8 (EdDSA) |
| Authenticator Modes | Platform (Touch ID, Windows Hello) and Cross-Platform (YubiKey, Titan) |
| Cloning Prevention | Monotonically increasing signature counter (`signCount`) validation |

Web browsers send challenges with variable padding. `WebAuthnChallengeHelper` normalizes challenges into three canonical representations to guarantee lookup success across memory cache and SQL stores.[](source:rfc4648)

| Authenticator Model | AAGUID Signature | Supported Transports | Enterprise Security Tier |
| --- | --- | --- | --- |
| Apple Touch ID & Face ID {#row-apple} | `6028b012-b13a-49b0-912b-ee0276ee14fb` | internal, hybrid | {good:Biometric Secure Enclave} |
| Apple iCloud Keychain {#row-icloud} | `dd482d9f-..., 9f4277e0-...` | internal, hybrid | {good:Multi-Device Synced} |
| Windows Hello {#row-winhello} | `08987058-cadc-4b81-b6e1-30de50dcbe96` | internal | {good:TPM 2.0 Hardware Bound} |
| YubiKey 5 Series & 5 NFC {#row-yubikey} | `cb94e2b3-..., ee882879-...` | usb, nfc | {good:FIPS 140-2 Level 3 Token} |
| Google Titan Security Key {#row-titan} | `b93d3d33-d08d-484b-a2ea-77f9d0e30f38` | usb, nfc, ble | {good:Titan Crypto Processor} |
| Google Password Manager {#row-gpass} | `ea9b8d66-4d01-1d21-3ce4-b6b48cb575d4` | internal, hybrid | {good:Cloud Synced Credential} |

## How does Enterprise SSO Identity Federation bind OIDC and SAML 2.0 accounts? {#enterprise-sso-federation}

@workflow id=sso-federation-flow title="Enterprise SSO Federation & Dual-Mode Binding Lifecycle"
| idp | Enterprise IdP (OIDC/SAML2) | external |
| callback | /api/v1/auth/admin/external-logins/link | backend |
| mediator | AstraFlow Mediator | backend |
| handler | LinkAdminExternalAccountHandler | backend |
| entity | ExternalLogin Record | database |
| audit | AuditService Security Log | security |
| notify | NotificationService Alert | messagebus |
| idp > callback | OIDC Callback (Claims + Subject ID) | emphasis |
| callback > mediator | Send LinkAdminExternalAccountCommand |
| mediator > handler | Dispatch Command |
| handler > entity | Bind ExternalLogin (ProviderKey, Email) | security |
| handler > audit | Record AuditEventTypes.ExternalLoginLinked |
| handler > notify | Dispatch Security Notification |

Enterprise SSO supports Dual-Mode identity binding. Administrators authenticate using corporate single sign-on while preserving hardware passkeys as fallback credentials.[](source:oidc_core)

| Enterprise Provider | Authentication Protocol | Tenant Domain Mapping | Account Binding Mode |
| --- | --- | --- | --- |
| Google Workspace Enterprise {#row-google} | OpenID Connect (OIDC) | `al-ahly.org` | {good:Automatic Domain Claim Link} |
| Microsoft Entra ID (Azure AD) {#row-entra} | OpenID Connect (OIDC) | `corp.al-ahly.org` | {good:Enterprise Tenant Federation} |
| Okta Workforce Identity {#row-okta} | SAML 2.0 / OIDC | `sso.al-ahly.org` | {good:Corporate Role Synchronization} |
| GitHub Enterprise Cloud {#row-github} | OpenID Connect (OIDC) | `github.com/scripe-org` | {good:DevOps Identity Verification} |

## How does the Interactive CIDR Perimeter Allowlist and Step-Up WebAuthn protect admin endpoints? {#cidr-perimeter-stepup}

@sequence id=perimeter-guard-seq title="CIDR Ingress Inspection, Biometric Sudo Mode & Nuclear Lockdown"
| actor admin | Admin Workstation | external |
| actor ui | AccountSecurityView UI | frontend |
| actor mw | CIDR Filter Middleware | security |
| actor sudo | Biometric Sudo Guard | security |
| actor redis | Redis Session Cache | database |
| phase | 1. Ingress Subnet Validation |
| admin | mw | Ingress HTTP Request | emphasis |
| mw | redis | Check Client IP Against Trusted Subnets | security |
| redis | mw | Subnet Authorized | return |
| mw | admin | 200 OK Permitted to Proceed | return |
| phase | 2. Biometric Sudo Mode (15-Minute Sliding TTL) |
| admin | ui | Request Sensitive Policy Change | emphasis |
| ui | sudo | Verify Sudo Mode Token | security |
| sudo | admin | Prompt WebAuthn Step-Up Assertion | security |
| admin | sudo | Hardware Passkey Confirmed | return |
| sudo | ui | Issue 15-Minute Sudo Session Token | return |
| phase | 3. Nuclear Emergency Account Lockdown |
| admin | ui | Activate Emergency Account Lockdown | emphasis |
| ui | redis | Blacklist All Active JWTs in IAccountRevocationCache | security |
| redis | ui | All Sessions Terminated & Account Locked | return |
| ui | admin | Account Frozen (Recovery Key Required) | return |

@callout level=warning title="Fail-Closed Perimeter & Nuclear Lockdown Invariant"
The CIDR perimeter evaluates client IP addresses before any handler execution. Activating Nuclear Account Lockdown immediately blacklists all active JWTs in Redis and terminates all administrative sessions across all devices.[](source:account_security_view)

| Perimeter Defense Layer | Enforcement Point | Technical Mechanism | Operational Recovery |
| --- | --- | --- | --- |
| Subnet CIDR Allowlist {#row-cidr} | Middleware Stage 16 | IPv4 (`/32`, `/24`) & IPv6 (`/64`, `/128`) CIDR Evaluation | {good:Admin re-enrollment from trusted IP} |
| Biometric Sudo Mode {#row-sudo} | Sensitive Action Guard | 15-Minute Sliding Memory Token | {good:Re-authenticate with Passkey} |
| Nuclear Emergency Lockdown {#row-lockdown} | Redis Cache & DB | Instant Token Revocation & Account Freeze | {caution:Master Security Recovery Key} |

## How are Sovereign Account Security policies configured and verified in production? {#verification-checklist}

- [ ] Configure `WebAuthn:RpId` and `WebAuthn:Origin` in backend `appsettings.json` for production hostnames.
- [ ] Connect `IAccountRevocationCache` to a distributed Redis cluster for fail-closed token invalidation.
- [ ] Verify that all passkey registration and login challenges use RFC 4648 §5 unpadded Base64Url strings.
- [ ] Confirm that authenticator signature counters strictly increment to prevent token cloning.
- [ ] Validate that Enterprise SSO unlinking preserves at least one primary authentication method.
- [ ] Ensure administrative workstation subnets are added to the CIDR allowlist before activating enforcement.
