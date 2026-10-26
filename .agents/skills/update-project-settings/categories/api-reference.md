# API reference settings

These settings shape the API reference pages generated from the project's API definitions:

- `reference`: the interactive API explorer ("Try It"), examples, code snippets, and display options.
- `api_designer`: whether API definitions can be edited inside ReadMe.
- `health_check`: the API status shown to readers.

The API definitions themselves are not settings. Who can open the `/openapi` page is `privacy.openapi` in [access and domain](access-and-domain.md); fonts and colors used by the reference are in [appearance](appearance.md). See [API reference](https://docs.readme.com/main/docs/api-reference).

Every setting here is available on every plan except API status, which requires Pro, and the JSON editor, which requires Enterprise.

## Interactive explorer

### Choose which parts of the explorer are interactive

The dashboard offers three checkboxes; the API stores them in two fields.

Parameter inputs and Try It share `reference.param_inputs`:

| Parameter inputs | Try It | `param_inputs` |
| --- | --- | --- |
| on | on | `all` (default) |
| on | off | `inputs_only` |
| off | on | `try_it_only` |
| off | off | `none` |

Without the input form, parameters render as read-only documentation.

Authentication is `reference.credentials`: `enabled` shows the form where readers enter their API credentials.

An operation's `x-explorer-enabled` extension in the API definition decides Try It for that operation, whatever `param_inputs` says. See [disable the API explorer](https://docs.readme.com/main/docs/openapi-extensions#disable-the-api-explorer).

### Prefill parameters with default values

Set `reference.defaults`. It controls how the `default` values in the API definition fill the request form:

- `use_only_if_required` (default): only required parameters are prefilled.
- `always_use`: every parameter with a `default` is prefilled and sent, including optional ones.

Either way, a required object or array with no value is sent as `{}` or `[]`.

### Tune how the request form behaves

Each is `enabled` or `disabled`:

- `reference.validate_required_fields`: Try It refuses to send until every required field has a value. File uploads and fields inside collapsed objects are not checked. Off by default.
- `reference.json_editor`: readers can edit the request body as raw JSON. Off by default. Requires Enterprise.
- `reference.fill_optional_objects_on_expand`: expanding an optional object adds its fields to the request. On by default. The filled values still follow `reference.defaults`.

### Turn the OAuth flows experience on or off

Set `reference.oauth_flows` to `enabled` to let readers get an OAuth 2.0 access token from inside the API reference, using the OAuth security schemes in the API definition. See [OAuth configuration options](https://docs.readme.com/main/docs/openapi-extensions#oauth-configuration-options).

### Show or hide request history

Set `reference.request_history`. When `enabled`, each endpoint page has a "Recent Requests" section listing the reader's recent calls to that endpoint, drawn from the API logs the project sends to ReadMe. See [Developer Dashboard](https://docs.readme.com/main/docs/developer-dashboard).

## Examples and code snippets

### Expand examples and schemas by default

Each is `expanded` or `collapsed` (default):

- `reference.request_examples`: `expanded` fills the request form with the first request example; `collapsed` leaves the reader to pick one.
- `reference.response_examples`: `expanded` opens the first 2xx response example.
- `reference.response_schemas`: `expanded` opens the first 2xx response schema.

### Offer SDK-generated Node.js snippets

Set `reference.api_sdk_snippets` to `enabled` (default) to add ReadMe's `api` SDK as a Node.js code sample option and make it the default Node.js sample. See [simple mode](https://docs.readme.com/main/docs/openapi#simple-mode).

### Show or hide the OpenAPI download button

Set `reference.show_openapi_download` to `enabled` to add a download action for the API definition on reference pages. Who can download the file follows `privacy.openapi` in [access and domain](access-and-domain.md), so check it before enabling the button for a public site.

### External SDK snippets (read-only)

`reference.sdk_snippets.external` reports whether code samples come from an external SDK generator such as Speakeasy (see [integrations](integrations.md)): `disabled`, `enabled` (available), or `active` (in use). ReadMe manages it; users who want it should contact support@readme.io.

## Display

### Adjust how reference pages look

- `reference.method_badge_style`: `classic` or `modern` HTTP method badges.
- `reference.show_method_in_sidebar`: `enabled` shows the method badge next to each endpoint in the sidebar.
- `reference.webhook_badge`: how webhooks are marked in the sidebar. `icon` adds a webhook glyph beside the method badge, `pill` replaces the method badge with a `webhook` badge, `none` adds no marker.
- `reference.flat_sections`: `enabled` renders parameter and response sections flat instead of boxed.
- `reference.param_font`: `monospace` sets parameter names in the project's code font (see typography in [appearance](appearance.md)).
- `reference.oneof_layout`: `oneOf` schemas render as `tabs` or a `dropdown` (default).

## API Designer

### Allow or block editing in the API Designer

Set `api_designer.allow_editing` to `disabled` when the API definition is managed outside ReadMe, so it only changes at its source. See [the API Designer](https://docs.readme.com/main/docs/building-apis-from-scratch-with-the-api-designer).

## API status

API status shows readers whether the API is up, and a message when it is down. Requires Pro. See [health check](https://docs.readme.com/main/docs/health-check-status-updates).

### Show the API status to readers

Set `health_check.provider`:

- `manual`: set the status by hand in `health_check.settings.manual.status` (`up` or `down`), with an optional `health_check.settings.manual.url` shown to readers while it is down. The status reads `down` until it is first set, so send `status: up` together with `provider: manual` unless the API really is down. Changes can take up to a minute to appear.
- `statuspage`: follow an [Atlassian Statuspage](https://www.atlassian.com/software/statuspage). Set `health_check.settings.statuspage.id` to the page ID, a short code like `nz3r09cr7dk1` rather than a URL. ReadMe fetches the page when saving and rejects an ID Statuspage does not recognise.
- `none` (default): no status is shown.
