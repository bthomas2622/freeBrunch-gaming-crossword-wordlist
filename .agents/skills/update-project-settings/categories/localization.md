# Localization settings

Localization settings live under `i18n` and cover two things:

- **Languages:** whether the docs site offers more than one language, which languages, and which is the default.
- **AI translator guidance:** words to keep as they are, and per-language notes for ReadMe's AI translator.

The third-party Localize.js widget is a separate option in [integrations](integrations.md).

## Where localization is set

Localization requires Enterprise and is stored on the enterprise group parent:

- **Group parent:** the only project where writes are saved. Every child in the group uses these values.
- **Group child:** reads the parent's values. Writes return 200 and change nothing, so make the change on the parent.
- **Project outside a group:** always reads translation `disabled` with English as the only language, and ignores writes.

When the user's project is a child, confirm they have access to the parent before planning changes.

## Languages

### Turn translation on or off

Set `i18n.state`. When `enabled`, readers get a language selector in the site header, and each extra language is a manually translated copy of the docs, managed from the branch menu.

The dashboard turns translation on whenever a language besides the default is listed, and off otherwise. The API stores `state` exactly as sent, so set it alongside `i18n.languages`.

### Add or remove languages

Set `i18n.languages` (full array) to `{ "code": "<language code>", "type": "manual" }` entries. Read the current array and keep every existing entry you are not removing, including `ai` entries with their `project_ids`.

The API always stores the default language first, as `manual`, whether or not you send it.

`type: "ai"` (AI-translated) works only for languages listed in `i18n.ai_unlocked_languages`. Any other AI language is rejected with an error naming it. AI translation is an extra purchase: direct the user to sales@readme.io. On AI entries, `nav_names` and `topnav_labels` are filled by ReadMe and ignored on write.

### Change the default language

Set `i18n.defaultLanguage`, and send `i18n.languages` in the same request with the new default first, so the language list stays consistent with it.

## AI translator guidance

These settings only affect AI-translated languages.

### Keep words untranslated

Set `i18n.do_not_translate_words` (full array) to product names, brand terms, and other words the AI translator must keep exactly. Entries are trimmed and duplicates removed, ignoring case. Changing the list retranslates the pages it affects. An empty array removes every entry.

### Give the translator guidance per language

Set `i18n.custom_contexts` to a map of language code to a note, such as the tone or preferred terminology for that language (up to 2,000 characters each). Unlike most maps, it merges:

- A language you send replaces its note.
- A language set to `null` or `""` loses its note.
- Languages you leave out keep theirs.

Editing a note retranslates nothing; it applies the next time each page is translated. The field reads `null` for users who are not team admins.

### AI-unlocked languages (read-only)

`i18n.ai_unlocked_languages` lists the languages ReadMe has unlocked for AI translation. ReadMe manages it; users who want more should contact sales@readme.io.
