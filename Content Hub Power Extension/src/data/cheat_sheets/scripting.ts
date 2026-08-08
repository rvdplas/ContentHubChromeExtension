import type { CheatSheetDefinition } from '../cheat_sheet_registry.js';

export const SCRIPTING_CHEAT_SHEET: CheatSheetDefinition = {
  id: 'scripting',
  title: 'Scripting Reference',
  description: 'MClient properties, context variables, script types and common C# snippets for Content Hub scripts.',
  iconClass: 'icon--script-outline',
  iconColor: 'rgb(222, 83, 224)',
  entries: [
    // ── Script types ────────────────────────────────────────────────────────
    {
      id: 'st-action-precommit',
      category: 'script-types',
      title: 'Action — Pre-commit',
      description: 'Runs before the triggering event completes. The only phase that can modify event data (e.g., populate default values). Can be In Process only.',
      tags: ['action', 'pre-commit', 'trigger', 'modify'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-types.html',
    },
    {
      id: 'st-action-validation',
      category: 'script-types',
      title: 'Action — Validation',
      description: 'Runs when the application validates event data. Throw a ValidationException to reject the operation.',
      snippet: 'throw new ValidationException("Field X is required.");',
      tags: ['action', 'validation', 'trigger'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-types.html',
    },
    {
      id: 'st-action-security',
      category: 'script-types',
      title: 'Action — Security',
      description: 'Runs when the application asserts user permissions. Throw a SecurityException to deny access.',
      snippet: 'throw new SecurityException("User is not allowed to perform this action.");',
      tags: ['action', 'security', 'trigger', 'permissions'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-types.html',
    },
    {
      id: 'st-action-audit',
      category: 'script-types',
      title: 'Action — Audit',
      description: 'Runs after event data is finalized. Use to log audit messages to internal or external systems.',
      tags: ['action', 'audit', 'logging'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-types.html',
    },
    {
      id: 'st-action-post',
      category: 'script-types',
      title: 'Action — Post',
      description: 'Runs after the triggering event is fully completed. Use for side effects that should not block the event.',
      tags: ['action', 'post', 'trigger'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-types.html',
    },
    {
      id: 'st-metadata',
      category: 'script-types',
      title: 'Metadata Processing',
      description: 'Runs after an asset is processed by the processing worker, just before the final execution step. Has access to File, Asset and MetadataProperties context.',
      tags: ['metadata', 'processing', 'asset', 'file'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-types.html',
    },
    {
      id: 'st-signin',
      category: 'script-types',
      title: 'User Sign-in',
      description: 'Runs every time a user logs in. Warning: a runtime error here can lock users out. Deactivate via REST API or SDK if needed.',
      tags: ['user', 'sign-in', 'authentication'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-types.html',
    },
    {
      id: 'st-prereg',
      category: 'script-types',
      title: 'User Pre-registration',
      description: 'Runs before a new user is created. Can validate or reject the registration.',
      tags: ['user', 'registration', 'pre-registration'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-types.html',
    },
    {
      id: 'st-postreg',
      category: 'script-types',
      title: 'User Post-registration',
      description: 'Runs after a new user is created. Use for onboarding side effects such as assigning groups or sending welcome notifications.',
      tags: ['user', 'registration', 'post-registration'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-types.html',
    },
    {
      id: 'st-shared',
      category: 'script-types',
      title: 'Shared',
      description: 'Reusable code referenced by one or more scripts of any type. When a shared script changes, all dependent scripts are rebuilt automatically.',
      tags: ['shared', 'reusable', 'library'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-types.html',
    },

    // ── MClient ─────────────────────────────────────────────────────────────
    {
      id: 'mc-entities',
      category: 'mclient',
      title: 'MClient.Entities',
      description: 'IEntitiesClient — Create, read, update, delete, save and search entities.',
      snippet: `// Get by ID
var entity = await MClient.Entities.GetAsync(12345);

// Save changes
await MClient.Entities.SaveAsync(entity);`,
      tags: ['entities', 'crud', 'get', 'save'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'mc-entitydefinitions',
      category: 'mclient',
      title: 'MClient.EntityDefinitions',
      description: 'IEntityDefinitionsClient — Read entity definitions and their members.',
      snippet: `var def = await MClient.EntityDefinitions.GetAsync("M.Asset");`,
      tags: ['entity definitions', 'schema', 'definition'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'mc-entityfactory',
      category: 'mclient',
      title: 'MClient.EntityFactory',
      description: 'IEntityFactory — Create new entity instances before saving them.',
      snippet: `var entity = await MClient.EntityFactory.CreateAsync("M.Asset", CultureInfo.InvariantCulture);`,
      tags: ['entity factory', 'create', 'new'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'mc-typedfactory',
      category: 'mclient',
      title: 'MClient.TypedEntityFactory',
      description: 'ITypedEntityFactory — Create typed entity instances for strongly-typed access to members.',
      tags: ['typed entity', 'factory', 'strongly typed'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'mc-querying',
      category: 'mclient',
      title: 'MClient.Querying',
      description: 'IQueryingClient — Build and execute entity queries.',
      snippet: `var query = Query.CreateQuery(entities =>
  from e in entities
  where e.DefinitionName == "M.Asset"
  select e);

var result = await MClient.Querying.QueryAsync(query);`,
      tags: ['querying', 'query', 'search', 'linq'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'mc-logger',
      category: 'mclient',
      title: 'MClient.Logger',
      description: 'ILogger — Write log messages visible in the script telemetry view.',
      snippet: `MClient.Logger.Info("Processing started for asset: " + entityId);
MClient.Logger.Warn("Unexpected value encountered.");
MClient.Logger.Error("Failed to process entity.");`,
      tags: ['logger', 'logging', 'debug', 'info', 'warn', 'error'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'mc-users',
      category: 'mclient',
      title: 'MClient.Users',
      description: 'IUsersClient — Read and update user entities.',
      snippet: `var user = await MClient.Users.GetCurrentUserAsync();`,
      tags: ['users', 'current user', 'user management'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'mc-datasources',
      category: 'mclient',
      title: 'MClient.DataSources',
      description: 'IDataSourcesClient — Interact with option lists and data sources.',
      tags: ['data sources', 'option list', 'datasource'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'mc-datasourcefactory',
      category: 'mclient',
      title: 'MClient.DataSourceFactory',
      description: 'IDataSourceFactory — Create new data source instances.',
      tags: ['data source factory', 'option list', 'create'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'mc-scripts',
      category: 'mclient',
      title: 'MClient.Scripts',
      description: 'IScriptsClient — Manage and invoke other scripts programmatically.',
      tags: ['scripts', 'invoke', 'manage'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'mc-settings',
      category: 'mclient',
      title: 'MClient.Settings',
      description: 'ISettingsClient — Read application settings.',
      snippet: `var setting = await MClient.Settings.GetSettingByNameAsync("MySetting");`,
      tags: ['settings', 'configuration'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'mc-policies',
      category: 'mclient',
      title: 'MClient.Policies',
      description: 'IPoliciesClient — Read and evaluate security policies.',
      tags: ['policies', 'security', 'permissions'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'mc-commands',
      category: 'mclient',
      title: 'MClient.Commands',
      description: 'ICommandsClient — Execute platform commands.',
      tags: ['commands', 'execute'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'mc-notifications',
      category: 'mclient',
      title: 'MClient.Notifications',
      description: 'INotificationsClient — Send in-platform notifications to users.',
      snippet: `await MClient.Notifications.SendNotificationAsync(userId, "Your asset is ready.");`,
      tags: ['notifications', 'send', 'user'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'mc-jobs',
      category: 'mclient',
      title: 'MClient.Jobs',
      description: 'IJobsClient — Monitor and manage background jobs.',
      tags: ['jobs', 'background', 'monitor'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'mc-cultures',
      category: 'mclient',
      title: 'MClient.Cultures',
      description: 'ICultureClient — List available cultures configured in the platform.',
      tags: ['cultures', 'localization', 'language'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'mc-package',
      category: 'mclient',
      title: 'MClient.Package',
      description: 'IPackageClient — Work with content packages for import/export.',
      tags: ['package', 'import', 'export'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },

    // ── Context ──────────────────────────────────────────────────────────────
    {
      id: 'ctx-action-webapi',
      category: 'context',
      title: 'Context — Action (Web API)',
      description: 'Available when the script is called via REST. ExecutionSource = WebApi.',
      snippet: `// Context properties
Context.ExecutionSource  // ExecutionSource.WebApi
Context.ExecutionType    // ExecutionType.InProcess
Context.Data             // JToken — POST body
Context.Result           // JToken — response body (set this)
Context.StatusCode       // HttpStatusCode`,
      tags: ['context', 'action', 'web api', 'rest', 'webapi'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'ctx-action-external',
      category: 'context',
      title: 'Context — Action (External Action)',
      description: 'Available when the script is called from a page component or mass-edit menu. ExecutionSource = ExternalAction | MassEdit.',
      snippet: `Context.ExecutionSource   // ExternalAction or MassEdit
Context.ExecutionType     // InProcess
Context.TargetId          // long — entity ID that triggered the action
Context.ActionParameters  // IDictionary<string,string>`,
      tags: ['context', 'action', 'external action', 'mass edit', 'page component'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'ctx-action-trigger-inprocess',
      category: 'context',
      title: 'Context — Action (Trigger In Process)',
      description: 'Available when called by a trigger running in-process. ExecutionType = InProcess.',
      snippet: `Context.ExecutionSource   // ExecutionSource.Trigger
Context.ExecutionType     // ExecutionType.InProcess
Context.Event             // string — event name
Context.Target            // IEntity — entity that triggered the event
Context.Payload           // IDictionary<string,object>`,
      tags: ['context', 'action', 'trigger', 'in process'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'ctx-action-trigger-outofprocess',
      category: 'context',
      title: 'Context — Action (Trigger Out of Process)',
      description: 'Available when called by a trigger running in the background. ExecutionType = OutOfProcess.',
      snippet: `Context.ExecutionSource   // ExecutionSource.Trigger
Context.ExecutionType     // ExecutionType.OutOfProcess
Context.Event             // string — event name
Context.Target            // IEntity — entity that triggered the event
Context.Payload           // IDictionary<string,object>`,
      tags: ['context', 'action', 'trigger', 'out of process', 'background'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'ctx-metadata',
      category: 'context',
      title: 'Context — Metadata Processing',
      description: 'Available in metadata processing scripts.',
      snippet: `Context.File                // IFile — Filename, Extension
Context.Asset               // IEntity — the asset entity
Context.MetadataProperties  // IReadOnlyDictionary<string,JToken>`,
      tags: ['context', 'metadata', 'processing', 'file', 'asset'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'ctx-signin',
      category: 'context',
      title: 'Context — User Sign-in',
      description: 'Available in user sign-in scripts.',
      snippet: `Context.AuthenticationSource  // Internal | External
Context.User                  // IEntity — signed-in user
Context.ExternalUserInfo      // provider, username, email, culture, claims
                              // (only when AuthenticationSource == External)`,
      tags: ['context', 'user', 'sign-in', 'authentication'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'ctx-prereg',
      category: 'context',
      title: 'Context — User Pre-registration',
      description: 'Available in user pre-registration scripts.',
      snippet: `Context.AuthenticationSource  // Internal | External
Context.Username              // string
Context.Email                 // string
Context.Culture               // CultureInfo`,
      tags: ['context', 'user', 'pre-registration'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'ctx-postreg',
      category: 'context',
      title: 'Context — User Post-registration',
      description: 'Available in user post-registration scripts.',
      snippet: `Context.AuthenticationSource  // Internal | External
Context.User                  // IEntity — the newly created user
Context.ExternalInfo          // provider, username, email, culture, claims
                              // (only when AuthenticationSource == External)`,
      tags: ['context', 'user', 'post-registration'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },

    // ── Snippets ─────────────────────────────────────────────────────────────
    {
      id: 'snip-get-by-id',
      category: 'snippets',
      title: 'Get entity by ID',
      description: 'Load a single entity using its numeric ID.',
      snippet: `long entityId = 12345;
var entity = await MClient.Entities.GetAsync(entityId);

if (entity == null)
{
    MClient.Logger.Warn($"Entity {entityId} not found.");
    return;
}`,
      tags: ['entity', 'get', 'id', 'fetch'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'snip-get-by-identifier',
      category: 'snippets',
      title: 'Get entity by identifier',
      description: 'Load a single entity using its string identifier.',
      snippet: `var entity = await MClient.Entities.GetAsync("M.Asset.MyIdentifier");

if (entity == null)
{
    MClient.Logger.Warn("Entity not found.");
    return;
}`,
      tags: ['entity', 'get', 'identifier', 'fetch'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'snip-update-property',
      category: 'snippets',
      title: 'Read and update a property',
      description: 'Get a property value from an entity and update it.',
      snippet: `var entity = await MClient.Entities.GetAsync(entityId);

// Read
var title = entity.GetPropertyValue<string>("Title");

// Update
entity.SetPropertyValue("Title", CultureInfo.InvariantCulture, "New Title");

await MClient.Entities.SaveAsync(entity);`,
      tags: ['entity', 'property', 'update', 'set', 'get', 'save'],
    },
    {
      id: 'snip-create-entity',
      category: 'snippets',
      title: 'Create and save a new entity',
      description: 'Create a new entity of a given definition and persist it.',
      snippet: `var entity = await MClient.EntityFactory.CreateAsync(
    "M.Asset",
    CultureInfo.InvariantCulture);

entity.SetPropertyValue("Title", CultureInfo.InvariantCulture, "My New Asset");

var id = await MClient.Entities.SaveAsync(entity);
MClient.Logger.Info($"Created entity with ID: {id}");`,
      tags: ['entity', 'create', 'save', 'new'],
    },
    {
      id: 'snip-query',
      category: 'snippets',
      title: 'Query entities',
      description: 'Build a LINQ-style query to retrieve a filtered list of entities.',
      snippet: `var query = Query.CreateQuery(entities =>
    from e in entities
    where e.DefinitionName == "M.Asset"
       && e.Property("Title") == "My Asset"
    select e);

query.Take = 10;

var result = await MClient.Querying.QueryAsync(query);

foreach (var item in result.Items)
{
    MClient.Logger.Info($"Found: {item.Id}");
}`,
      tags: ['query', 'search', 'linq', 'filter', 'entities'],
      docsUrl: 'https://doc.sitecore.com/ch/en/developers/cloud-dev/script-properties.html',
    },
    {
      id: 'snip-log',
      category: 'snippets',
      title: 'Log messages',
      description: 'Write diagnostic messages visible in the script telemetry view.',
      snippet: `MClient.Logger.Debug("Verbose detail for troubleshooting.");
MClient.Logger.Info("Normal progress message.");
MClient.Logger.Warn("Something unexpected but recoverable.");
MClient.Logger.Error("An error occurred: " + ex.Message);`,
      tags: ['log', 'logger', 'debug', 'info', 'warn', 'error', 'telemetry'],
    },
    {
      id: 'snip-validation-exception',
      category: 'snippets',
      title: 'Throw ValidationException',
      description: 'Reject an operation from a Validation-phase Action script.',
      snippet: `var title = Context.Target.GetPropertyValue<string>("Title");

if (string.IsNullOrWhiteSpace(title))
{
    throw new ValidationException("Title is required.");
}`,
      tags: ['validation', 'exception', 'reject', 'error'],
    },
    {
      id: 'snip-security-exception',
      category: 'snippets',
      title: 'Throw SecurityException',
      description: 'Deny an operation from a Security-phase Action script.',
      snippet: `var user = await MClient.Users.GetCurrentUserAsync();
var isAllowed = /* your permission check */false;

if (!isAllowed)
{
    throw new SecurityException("You do not have permission to perform this action.");
}`,
      tags: ['security', 'exception', 'deny', 'permissions'],
    },
    {
      id: 'snip-current-user',
      category: 'snippets',
      title: 'Get current user',
      description: 'Retrieve the entity representing the user executing the script.',
      snippet: `var user = await MClient.Users.GetCurrentUserAsync();
var username = user.GetPropertyValue<string>("Username");
MClient.Logger.Info($"Executed by: {username}");`,
      tags: ['user', 'current user', 'username'],
    },
    {
      id: 'snip-relation',
      category: 'snippets',
      title: 'Read and set a relation',
      description: 'Access entity relations (parent/child links).',
      snippet: `// Read related IDs
var relation = entity.GetRelation("AssetToPublicLink", RelationRole.Parent);
var childIds = relation?.GetIds() ?? Enumerable.Empty<long>();

// Add a related entity
relation?.SetIds(childIds.Append(relatedEntityId));

await MClient.Entities.SaveAsync(entity);`,
      tags: ['relation', 'link', 'parent', 'child', 'related'],
    },
  ],
};
