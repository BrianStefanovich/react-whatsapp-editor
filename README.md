# react-whatsapp-editor ![npm](https://img.shields.io/npm/v/react-whatsapp-text-editor)

## Instalation

Run ```npm install react-whatsapp-editor```

## Usage

```jsx
import react from "React"
import TextEditor from "react-whatsapp-editor"

...

<TextEditor 
open
onText={(rftText, formattedText)=> { ... } }
onDelete={ ()=> { ... }}
emojiTitle="title"
>
```

| Prop |Type| Description |
|------|----|-------------|
|open|bool|Set editor state open or closed|
|emojiTitle|string|Set emoji-mart title|
|onText|function([string], string)|Function called on each text change. It gets two arguments, noFormated text, that is rtf text being display on screen, and formatedText that's the same text but on WhatsApp rtf format|
|onDelete|function|This function is called each time that delete button is pressed. It gets no arguments|
