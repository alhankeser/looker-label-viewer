# Looker Label Viewer for VS Code

Looker Label Viewer allows you to see localized labels in lookml files without having to open the localization file.

## Features

Hover over a localized label to view the corresponding label value.

![looker_label_viewer](https://github.com/alhankeser/looker-label-viewer/assets/15135669/4703d3a0-99ff-407a-b472-7fa481a903dc)

It currently does not support the ability to change extension settings related to:
- Target attributes. It defaults to trying to get labels for:
  - label
  - group_label
  - group_item_label
  - view_label

## Settings

### Localization File
To change the default `en.strings.json` to something else, use the following setting: 
```"lookerlabelviewer.localizedStringsFileName": "en.strings.json"```