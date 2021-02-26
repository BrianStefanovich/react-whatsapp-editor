# react-whatsapp-editor ![npm](https://img.shields.io/npm/v/react-whatsapp-text-editor)

An easy to use rtf editor, that emulates WhatsApp editor and output rft text, on WhatsApp rtf format.

![Component emoji piker opened](https://github.com/BrianStefanovich/react-whatsapp-editor/blob/master/img/emoji.png)
![Component opened](https://github.com/BrianStefanovich/react-whatsapp-editor/blob/master/img/open.png)
![Component closed](https://github.com/BrianStefanovich/react-whatsapp-editor/blob/master/img/closed.png)


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
