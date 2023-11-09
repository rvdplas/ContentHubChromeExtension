export const PATHS = {
  DEFAULT: {
    APIENTITY: "{origin}/api/entities/{entityId}",
    APIASSET: "{origin}/en-us/asset/{entityId}",
    APIENTITYIDENTIFIER: "{origin}/api/entities/identifier/{entityIdentifier}",
    ENTITYMGMT: "{origin}/en-us/admin/entitymgmt/entity/{entityId}",
    MESSAGEMGMT: "{origin}/api/status/messages/{entityId}",
    INITSEARCH: "{origin}/api/search/InitSearch",
    OPTIONLIST: "{origin}/api/datasources/{datasource}",
    ENTITYDEFINITION:
      "{origin}/api/entitydefinitions/{definition}?includeConditionalMembers=true",
    QUEUES: "{origin}/api/status/queues",
  },
  CUSTOM: {
    Actions: "{origin}/en-us/admin/actions",
    MediaProcessing: "{origin}/en-us/admin/media-processing-mgmt",
    Pages: "{origin}/en-us/admin/page",
    Schema: "{origin}/en-us/admin/definitionmgmt",
    Scripts: "{origin}/en-us/admin/scripts",
    Settings: "{origin}/en-us/admin/settingmanagement",
    SettingsPost: "{origin}/api/entities",
    Taxonomy: "{origin}/en-us/admin/taxonomy",
    Themes: "{origin}/en-us/admin/thememgmt",
    Triggers: "{origin}/en-us/admin/triggers",
    AssetDetailPage: "{origin}/en-us/admin/page/566?q=asset+detail",
    SchemaM_Asset: "{origin}/en-us/admin/definitionmgmt/detail/40",
  },
};
