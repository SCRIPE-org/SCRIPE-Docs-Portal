/**
 * SCRIPE Data Exchange Studio & DataTransfer Module Documentation Locales — ZH
 * 涵盖技术模块概览、REST API 参考与商业展示内容。
 */
export const zh = {
  modules: {
    dataTransfer: {
      overview: {
        title: "数据交换工作室与 DataTransfer 引擎",
        description:
          "企业级多租户批量导入导出、ClosedXML 智能模板生成、17 条中东北非 (MENA) 线性标准化规则、预检配额模拟、多工作表拓扑迁移与 OWASP 安全防护。",
        intro:
          "SCRIPE Data Exchange Studio 将独立的整洁架构后端模块 (DataTransfer) 与共享核心引擎 (Core.Application.DataExchange 与 Core.Infrastructure.DataExchange) 及 4 步全视口前端工作室 (@core/data-exchange) 融为一体。它以经过 OWASP 加固的摄取流程、确定性线性时间标准化、原子配额租约及故障隔离的分块执行，全面取代脆弱的手工 CSV 脚本，兼容 SQL Server、PostgreSQL 与 Oracle。",
        infoTitle: "租户上下文边界与共享核心架构",
        infoContent:
          "数据交换端点与 DataTransferMenuProvider 路由强制要求 RequiresTenantContext = true；无有效租户时返回 DataTransfer.TenantRequired (400/422) 并渲染 DataExchangeTenantRequiredCard，引导平台超级管理员切换租户。电子表格流引擎、公式中和、OWASP ZIP 校验及 IEntityDataExchangeProvider 契约均解耦位于 Core 中。",
        archTitle: "三层整洁架构与 AstraFlow 全面锁定",
        archIntro:
          "遵循 SCRIPE 后端架构不变量，DataTransfer 将领域实体、CQRS 契约/编译期映射器及多数据库基础设施严格拆分为三个解耦项目，并独占 datatransfer 数据库模式与事务性 Outbox/Inbox 表。",
        featArchitecture: "严格的三层模块化隔离",
        featArchitectureDesc:
          "DataTransfer.*.csproj 对 CRM、Identity、PartyKernel 保持零项目引用。DataTransfer.Domain 定义 DataTransferJob（完成时向 datatransfer.outbox_messages 写入 DataExchangeJobCompletedEvent）、SavedMappingPreset 与 ExternalLegacyKeyMap；DataTransfer.Application 借助 [AstraGenerateMapping] DataTransferMaps 零反射调度 16 个 AstraFlow 请求；DataTransfer.Infrastructure 持久化至 SQL Server、PostgreSQL 与 Oracle 的 datatransfer 模式。",
        featSmartTemplates: "ClosedXML 智能模板与双语字段指南",
        featSmartTemplatesDesc:
          "生成本地化 .xlsx、.csv 与 .tsv 工作簿，通过 @ 文本格式 (OOXML NumberFormatId 49) 保护前导零与电话号码，内置 Excel 原生下拉校验 (最多 5,000 行)、双语 Field Guide 工作表以及用于上传时 SHA-256 SchemaFingerprint 漂移检测的极隐蔽 _scripe_meta 表。",
        featNormalization: "17 条线性时间 MENA 数据标准化规则",
        featNormalizationDesc:
          "SpreadsheetValueNormalizer 以确定性 O(n) 线性时间运行且杜绝 ReDoS 正则：支持阿拉伯语/波斯语数字转换、音符与 BiDi 控制符剥离、空值占位符规范化、SAR/EGP/AED/USD 货币及会计负数解析、E.164 电话标准化的全面处理。",
        featDryRunQuota: "零写入预检模拟 (Dry-Run) 与硬配额租约",
        featDryRunQuotaDesc:
          "在不写入数据库的情况下模拟模式、业务规则、自定义字段和许可证上限。正式执行前由 TryReserveSlotsAsync 在关系事务内原子获取 2 小时配额租约（对全部 6 个受配额实体执行失效闭合的 EnsureCounterAsync 初始化），并在完成、失败或取消时通过 ReconcileReservationLeaseAsync 动态清算。",
        featTopologicalDag: "多工作表拓扑 DAG 与两遍式自引用外键解析",
        featTopologicalDagDesc:
          "ComputeRelatedMultiSheetEntityKeys 动态发现调用方授权的多表 DAG 集群（CRM 5 表、PartyKernel 3 表；Identity 实体独立运行），并在 DataExchangeToolbarActions 与 EntitiesCatalogView 中自动启用多表迁移，配合 TopologicalSortSheets 与两遍式自引用外键解析。",
        featOwaspFls: "OWASP 上传防御、FLS 脱敏与 BYOK 加密",
        featOwaspFlsDesc:
          "OwaspSpreadsheetSecurityValidator 强制限制 25 MB 上传上限、100 MB 解压上限 / 1,000 条目 / 100 倍压缩比、宏拦截、禁止 DTD/XXE、HTML 清洗及 CsvFormulaGuard 公式中和，并与 [AstraSensitive]、IRestrictedFieldsResolver 及机密自定义字段 cf:* BYOK 加解密协同生效。",
        domainTitle: "领域聚合根与持久化架构",
        domainIntro:
          "所有实体继承 AuditableEntity<Guid> 并实现 ITenantAwareEntity，在 datatransfer 模式下自动强制租户隔离与跨数据库迁移。",
        pipelineTitle: "4 步全视口工作室数据流水线",
        pipelineIntro:
          "DataExchangeStudioOverlay 编排从模板下载或 OWASP 上传检查、声明式清洗配置、零写入预检直到分块同步或后台队列执行的完整闭环。",
        stepUpload: "第 1 步 — 模板下载与 OWASP 上传检查",
        stepUploadDesc:
          "下载单实体或多表模板或上传 .xlsx/.csv/.tsv 文件（最大 25 MB）。InspectUploadAsync 验证文件魔数、剥离恶意标记、读取表头和 5 行样本，并执行 3 级匹配（精确、别名、Levenshtein >= 0.72）。",
        stepMap: "第 2 步 — 列映射、预设配置文件与清洗规则",
        stepMapDesc:
          "将文件表头绑定到实体列及自动发现的自定义字段 (cf:*)，配置 17 项 DataExchangeTransformRule，通过 POST /presets/{id}/default 设为默认预设，或携带 initialPresetId 启动工作室，并由统一的 @core/ui/confirmation-dialog 守护退出、取消与删除操作。",
        stepDryRun: "第 3 步 — 预检 Dry-Run 与硬配额核查",
        stepDryRunDesc:
          "DryRunAsync 在修改任何数据前对全部数据行执行类型解析、关联完整性、自定义字段规则与许可配额模拟，精确反馈有效/无效行数、预计新增与更新数量及同步资格 (<= 250 行)。",
        stepExecute: "第 4 步 — 部分提交执行与拒收错误工作簿",
        stepExecuteDesc:
          "不超过 250 行时同步提交（除非指定 RunInBackground 或启用不超过 100 行的 OneTimeAutoPassword），更大批量自动转入后台并支持孤立 Running 作业租约恢复。每 250 行分块故障隔离，持久保存 ExternalLegacyKeyMaps（受唯一复合索引及提交前 EXTERNAL_KEY_CONFLICT 校验保护），并生成包含 _RowNumber、_ErrorCode、_ErrorColumn、_ErrorMessage 和 _CascadeParentRef 的 .xlsx 拒收簿（24 小时有效期）。",
        entitiesTitle: "已注册实体提供程序与扩展机制",
        entitiesIntro:
          "开箱即用支持 CRM、Identity 与 PartyKernel 的 10 个核心实体，新模块只需直接实现 IEntityDataExchangeProvider 即可接入（旧版 EfCoreEntityDataExchangeProviderBase 辅助类已弃用且未在生产提供程序中使用）。",
        normalizationTitle: "声明式 17 项转换规则契约",
        normalizationIntro:
          "每个 DataExchangeColumnMapping 均可携带 DataExchangeTransformRule 记录，在严格类型校验前按线性时间执行。",
        securityTitle: "OWASP 安全阈值、字段黑名单与 FLS",
        securityIntro:
          "安全策略在 API 上传、后台工作进程（通过从 ActorSnapshotJson 恢复的 DataExchangeAmbientContext）以及防公式导出中保持完全一致。",
        securityWarnTitle: "凭据与系统字段的绝对不可变性",
        securityWarnContent:
          "DataExchangeSecurityPolicy 严格屏蔽密码哈希、安全戳、API 密钥、TOTP 密钥、审计字段、RowVersion 以及标注 [AstraSensitive] 或 [AstraRedact] 的成员。LooksLikeMaskedSentinel 可识别脱敏占位符，防止 Update/Upsert 覆盖真实密钥。",
        governanceTitle: "PBAC 权限、功能开关与管理菜单",
        governanceIntro:
          "DataTransferPermissionProvider（7 个默认角色含 CRM_SALES_REP，其中 migrations.execute 分配给 6 个角色且排除 CRM_SALES_REP）、DataTransferFeatureProvider、DataTransferMenuProvider (RequiresTenantContext = true) 与 DataTransferDevDataSeeder (Order = 155) 在不设 [AdminOnly] 的前提下强制 [Authorize] + [PermissionRequired]，并基于 GenericCrudView 与 Showing 0-0 of 0 results 安全分页挂载全部视图。",
        tenantContextTitle: "租户隔离边界与平台超级管理员操作流程",
        tenantContextContent:
          "所有实体、作业、预设与 ExternalLegacyKeyMap 均严格隔离于租户内；主权平台表受 DataExchangeSecurityPolicy 禁止。平台超级管理员处于全局视图时，只需通过顶部租户切换器选定目标租户（或按 DataExchangeTenantRequiredCard 提示操作）即可安全使用数据交换菜单。",
        recoveryTitle: "安全容错模型：Dry-Run 预检、分块提交与协同取消（无事后全局回滚作业）",
        recoveryContent:
          "DataTransfer 刻意不提供可能覆盖并发修改的事后全局破坏性回滚作业；取而代之的是无写入 DryRunAsync 预检、250 行隔离分块提交与可下载的五列诊断拒收 .xlsx，以及通过 POST /jobs/{id}/cancel 调用 ReconcileReservationLeaseAsync 退还配额并由 DetachPendingOutboxMessages() 撤回未发送事件。",
        outboxTitle: "零耦合插件架构与 Outbox 异步事件",
        outboxIntro:
          "DataTransfer 仅通过 Core.Application 抽象自动发现领域实体，并通过模块专属 Outbox 异步广播作业完成事件，前后端均不引用兄弟业务模块。",
        adminSurfacesTitle: "为何实体目录为只读及各管理页面的协作方式",
        adminSurfacesIntro:
          "实体目录 (/admin/data-exchange) 由后台 DI 提供程序与版本权益动态生成，自定义字段统一在 /custom-fields 扩展，而作业记录 (/jobs) 与映射预设 (/presets) 则由工作室与模块工具栏直接驱动创建。",
        dagComparisonTitle: "单实体导入与多工作表拓扑迁移 (DAG) 对比",
        dagComparisonIntro:
          "两种模式共享 OWASP 检测、线性标准化与 250 行分块核心；当调用方在模块关联图中拥有两个及以上已授权父子实体时，ComputeRelatedMultiSheetEntityKeys 会自动解锁多工作表迁移。",
        dynamicMatrixTitle: "运行时动态自适应与硬编码安全边界对比",
        dynamicMatrixIntro:
          "实体目录、自定义字段、权限、配额与 DAG 集群均按租户和角色实时动态解析，而 OWASP 文件阈值、O(n) 标准化引擎及敏感字段黑名单则作为不可弱化的硬编码不变量严格执行。",
        normalizationPipelineTitle: "9 阶段确定性 O(n) 标准化流水线执行顺序",
        normalizationPipelineIntro:
          "已启用的 DataExchangeTransformRule 选项在严格类型解析前按固定顺序线性执行，确保中东文字、货币、电话与日期在前端预览、Dry-Run 和后台分块提交中呈现完全一致的结果。",
        editionsTitle: "版本权益矩阵 (EditionSeeder)",
        editionsIntro:
          "各功能开关依据租户订阅版本通过权益引擎动态解析。",
      },
    },
  },
  apiReference: {
    dataTransferApi: {
      title: "Data Exchange Studio API",
      description:
        "SCRIPE Data Exchange Studio (/api/v1/data-transfer) 完整 REST API 参考：实体描述符、智能模板、OWASP 检查、预检模拟、导入导出、映射预设与作业遥测。",
      intro:
        "DataTransferController 在 /api/v1/data-transfer (API v1.0) 下提供 16 个 REST 端点，全部由 AstraFlow Mediator 调度并返回标准 Result<T> 响应与 RFC-7807 问题详情。",
      authNoteTitle: "身份认证、租户解析与速率限制",
      authNote:
        "所有端点均要求 [Authorize]、[PermissionRequired(\"datatransfer.*\")] 与活动租户上下文 — 已移除类级 [AdminOnly]，确保含 CRM_SALES_REP 在内的 7 个角色正常操作（migrations.execute 仅限 6 个角色并排除 CRM_SALES_REP；无租户返回 DataTransfer.TenantRequired，未知实体返回 DataTransfer.UnknownEntity 404）。执行 per-user (100 次/分)、export-heavy (5 次/分) 限流及 X-Content-Type-Options: nosniff。",
      discoveryTitle: "实体发现、描述符与智能模板",
      discoveryIntro:
        "查询调用方授权可见实体，获取合并了自定义字段 (cf:*) 与 FLS 限制的有效描述符，并下载格式化模板。",
      epListEntitiesDesc:
        "列出依据当前权限与租户版本过滤的已注册数据交换实体，包含拓扑排序的 relatedMultiSheetEntityKeys、剩余配额与导入导出能力标志。",
      epGetDescriptorDesc:
        "返回目标实体的有效 DataExchangeEntityDescriptor、relatedMultiSheetEntityKeys 集群、受限 FLS 字段集合、功能开关及实时配额快照。",
      epDownloadTemplateDesc:
        "流式生成本地化 (.xlsx、.csv、.tsv) 单实体或拓扑排序多工作表模板，内置 @ 文本格式、Excel 下拉列表、Field Guide 与 _scripe_meta。",
      pipelineTitle: "4 步导入摄取流水线",
      pipelineIntro:
        "暂存经过校验的上传文件、执行零写入模拟，并触发同步 (<= 250 行) 或后台异步导入。",
      epInspectDesc:
        "接收最大 25 MB (26,214,400 字节) 的 multipart/form-data 上传，执行 OWASP 容器/XXE/宏检测，暂存清洗后文件并返回表头、5 行样本与建议映射。",
      epDryRunDesc:
        "针对已暂存的 UploadId 模拟模式校验、17 条清洗规则、自定义字段批量检验、外键查找与硬配额校验，不提交数据库写入。",
      epImportDesc:
        "执行单实体或多表拓扑导入，含 2 小时 TryReserveSlotsAsync / ReconcileReservationLeaseAsync 配额租约、250 行部分提交分块、可选身份入职模式、拒收工作簿生成及 Outbox 事件 DataExchangeJobCompletedEvent 发布。",
      exportTitle: "防公式注入流式导出",
      exportIntro:
        "按租户隔离、DataScope 与 IRestrictedFieldsResolver 自动过滤并经 CsvFormulaGuard 中和的按需或后台导出。",
      epExportSyncDesc:
        "在 HTTP 响应中直接流式输出防公式注入、FLS 脱敏的 .xlsx/.csv/.tsv 导出工作簿并记录已完成审计作业。",
      epExportAsyncDesc:
        "将大型导出作业排入后台工作进程生成（24 小时存储保留期），并立即返回 HTTP 202 Accepted 与 DataTransferJobDto。",
      presetsTitle: "已保存的列映射预设",
      presetsIntro:
        "管理租户级可复用的列映射配置与单列清洗规则方案。",
      epListPresetsDesc:
        "列出当前租户的映射预设，支持按 entityKey 或 search 关键词过滤。",
      epSavePresetDesc:
        "创建新映射预设或更新租户已有预设（经 DataTransferMaps 编译期投影高效处理）。",
      epSetDefaultPresetDesc:
        "原子性将租户映射预设设为其 entityKey 的默认预设，取消同实体原有默认标记并记录 DATA_EXCHANGE_PRESET_DEFAULT_SET 审计日志。",
      epDeletePresetDesc:
        "软删除租户持有的映射预设并返回 HTTP 204 No Content。",
      jobsTitle: "作业历史、取消与产物下载",
      jobsIntro:
        "通过 ProcessedRows 与 ProgressPercent 监控后台进度，支持协同取消与配额释放，以及下载拒收或导出工作簿。",
      epListJobsDesc:
        "分页返回租户下的 DataTransferJobDto 记录（page >= 1，pageSize 限制 1..100），支持按实体、关键字及状态过滤。",
      epGetJobDesc:
        "获取单个数据交换作业的完整行计数器、进度、产物标志与 UTC 时间戳。",
      epCancelJobDesc:
        "向排队中或运行中的作业发送协同取消信号，自动归还未使用配额并写入不可变安全审计事件。",
      epDownloadArtifactDesc:
        "在 24 小时保留窗口内流式下载带错行批注的拒收工作簿 (rejected) 或后台导出结果文件 (export)。",
      rateLimitsTitle: "载荷体积与速率限制保护",
      rateLimitsIntro:
        "总结所有强制请求上限、滑动/固定窗口限流策略、同步阈值与产物保留期限。",
      errorCodesTitle: "标准错误码与 HTTP 状态映射",
      errorCodesIntro:
        "AstraFlow.AspNetCore 将处理器返回的 Result<T> 失败统一映射为标准化 HTTP 响应，不抛出业务异常。",
    },
  },
  commercial: {
    dataExchangeStudio: {
      title: "SCRIPE 数据交换工作室",
      description:
        "凭借 MENA 本地化清洗、零风险 Dry-Run 模拟与企业级安全体系，在数分钟内完成组织、联系人、CRM 管线与团队数据的批量上线。",
      intro:
        "将数据表迁移到多租户企业软件常常受困于脆弱的 CSV 脚本、中文或阿拉伯文乱码、电话号码前导零丢失以及因局部错误导致的数据损坏。SCRIPE 数据交换工作室将复杂的导入导出全面重塑为向导式、可审计且安全可控的工作台。",
      statUploadCeiling: "OWASP 扫描文件上传上限",
      statTransformRules: "内置线性时间数据清洗规则",
      statChunkSize: "故障隔离分块提交规模",
      statEntityProviders: "开箱即用 CRM/身份/主体实体",
      valueTitle: "为什么运营与实施团队选择 Data Exchange Studio",
      featDryRunQuota: "零风险预检 Dry-Run",
      featDryRunQuotaDesc:
        "在修改任何一条正式记录之前，提前预览有效行数、预计新增与更新数量、外键匹配情况以及许可配额消耗。",
      featMenaBilingual: "双语表格智能与 MENA 本地化",
      featMenaBilingualDesc:
        "自动转换阿拉伯语/波斯语数字，清理音符与隐藏方向控制符，规范 SAR/EGP/AED/USD 金额，并以 @ 文本格式牢牢守护电话前导零。",
      featMultiSheetDag: "单工作簿多表拓扑迁移",
      featMultiSheetDagDesc:
        "在一个多标签页 Excel 文件中同时导入组织、人员、CRM 客户、联系人、线索、商机与跟进活动，由拓扑排序保证引用完整性。",
      featCustomFieldsPresets: "自定义字段发现与一键复用预设",
      featCustomFieldsPresetsDesc:
        "自动识别并验证租户配置的所有自定义字段；将常用的 ERP 或合作伙伴模板保存为预设，下次一键自动匹配。",
      featPartialCommit: "部分提交容错与即时纠错簿",
      featPartialCommitDesc:
        "不再因几行拼写错误而使整份万行文件失败——正确数据立即入库，错误行按原始行号、列名、错误码及级联父依赖导出为可修正工作簿。",
      featEnterpriseSecurity: "零信任 OWASP 与字段级安全保护",
      featEnterpriseSecurityDesc:
        "拦截宏、XXE、ZIP 炸弹与表格公式注入，同时严防密码哈希、API 密钥和受 FLS 保护的字段流入或流出电子表格。",
      tiersTitle: "按 SCRIPE 版本划分的能力矩阵",
      tiersIntro:
        "Sports Starter 起即提供防公式安全导出与智能模板；Standard 与 Sports Pro 解锁完整批量导入；Sports Ultra 与 Enterprise 全面开放多工作表拓扑迁移。",
      ctaTitle: "全面提速客户与俱乐部数据上线",
      ctaSubtitle:
        "浏览各版本权益方案，或深入了解 DataTransfer 整洁架构与 REST API 规范。",
      ctaPrimary: "查看定价与版本",
      ctaSecondary: "探索技术架构",
    },
  },
};
