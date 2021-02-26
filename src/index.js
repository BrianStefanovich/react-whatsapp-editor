import React, { useMemo, useState, useCallback } from "react";
import { createEditor, Transforms, Editor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import {
  TextBold32,
  TextItalic32,
  TextStrikethrough32,
  Code32,
  FaceSatisfied32,
  TrashCan32,
} from "@carbon/icons-react";
import { Button, Dropdown } from "carbon-components-react";
import "./_TextEditor.scss";

function reduceSlate(value) {
  const lastIndex = value.length - 1;
  const paragraphReducer = (accumulator, currentValue, index) => {
    const textReducer = (accumulator, currentValue) => {
      if (currentValue.bold) {
        if (currentValue.text !== "") {
          return `${accumulator} *${currentValue.text}*`;
        } else {
          return `${accumulator} ${currentValue.text}`;
        }
      } else if (currentValue.italic) {
        if (currentValue.text !== "") {
          return `${accumulator} _${currentValue.text}_`;
        } else {
          return `${accumulator} ${currentValue.text}`;
        }
      } else if (currentValue.code) {
        if (currentValue.text !== "") {
          return accumulator + "```" + currentValue.text + "```";
        } else {
          return `${accumulator} ${currentValue.text}`;
        }
      } else if (currentValue.overline) {
        if (currentValue.text) {
          return `${accumulator} ~${currentValue.text}~`;
        } else {
          return `${accumulator} ${currentValue.text}`;
        }
      } else {
        return `${accumulator} ${currentValue.text}`;
      }
    };

    if (index !== lastIndex) {
      return (
        accumulator + `${currentValue.children.reduce(textReducer, "")} \n`
      );
    } else {
      return accumulator + `${currentValue.children.reduce(textReducer, "")}`;
    }
  };
  return value.reduce(paragraphReducer, "");
}

function TextEditor(props) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [emoji, setEmoji] = useState(false);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  const toggleEmoji = () => {
    setEmoji(!emoji);
  };

  const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>;
  };

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }

    if (leaf.code) {
      children = <code>{children}</code>;
    }

    if (leaf.italic) {
      children = <em>{children}</em>;
    }

    if (leaf.overline) {
      children = <strike>{children}</strike>;
    }

    return <span {...attributes}>{children}</span>;
  };

  const addText = (text) => {
    Transforms.insertText(editor, text);
  };

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const ToolBar = () => {
    return (
      <div className="ToolBar">
        {props.variables ? (
          <Dropdown
            onChange={(e) => addText(`{${e.selectedItem}}`)}
            size="sm"
            type="inline"
            items={props.variables}
            titleText="Variables"
          />
        ) : null}
        <Button
          renderIcon={TextBold32}
          kind="ghost"
          hasIconOnly
          size={"small"}
          iconDescription="Bold"
          onClick={() => {
            const [match] = Editor.nodes(editor, {
              match: (n) => n.bold,
            });

            Transforms.setNodes(
              editor,
              { bold: match ? false : true },
              { match: (n) => Text.isText(n), split: true }
            );
          }}
        />
        <Button
          renderIcon={TextItalic32}
          kind="ghost"
          hasIconOnly
          iconDescription="Italic"
          size={"small"}
          onClick={() => {
            const [match] = Editor.nodes(editor, {
              match: (n) => n.italic,
            });

            Transforms.setNodes(
              editor,
              { italic: match ? false : true },
              { match: (n) => Text.isText(n), split: true }
            );
          }}
        />
        <Button
          renderIcon={TextStrikethrough32}
          kind="ghost"
          hasIconOnly
          iconDescription="Strike through"
          size={"small"}
          onClick={() => {
            const [match] = Editor.nodes(editor, {
              match: (n) => n.overline,
            });

            Transforms.setNodes(
              editor,
              { overline: match ? false : true },
              { match: (n) => Text.isText(n), split: true }
            );
          }}
        />
        <Button
          renderIcon={Code32}
          kind="ghost"
          hasIconOnly
          iconDescription="Monospace"
          size={"small"}
          onClick={() => {
            const [match] = Editor.nodes(editor, {
              match: (n) => n.code,
            });

            Transforms.setNodes(
              editor,
              { code: match ? false : true },
              { match: (n) => Text.isText(n), split: true }
            );
          }}
        />
        <Button
          renderIcon={FaceSatisfied32}
          kind="ghost"
          iconDescription="Emoji"
          hasIconOnly
          size={"small"}
          onClick={toggleEmoji}
        />
      </div>
    );
  };

  return (
    <div
      onClick={() => {
        if (emoji) {
          toggleEmoji();
        }
      }}
      className="TextEditor"
    >
      {props.open ? <ToolBar /> : null}
      <div className="EmojiPicker">
        {emoji ? (
          <Picker
            title={props.emojiTitle}
            perLine={8}
            showPreview={false}
            onClick={(emoji) => {
              addText(emoji.native);
            }}
          />
        ) : null}
      </div>

      <div className="Main">
        <Slate
          editor={editor}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            props.onText(newValue, reduceSlate(newValue));
          }}
        >
          <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
        </Slate>
        {props.open ? null : (
          <Button
            className="DeleteButton"
            hasIconOnly
            renderIcon={TrashCan32}
            kind={"secondary"}
            iconDescription="Delete this variant"
            onClick={() => {
              props.onDelete();
            }}
          />
        )}
      </div>
    </div>
  );
}

export default TextEditor;
