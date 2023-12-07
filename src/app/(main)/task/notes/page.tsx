'use client';
import { Editor, EditorTools } from '@progress/kendo-react-editor';

const { Bold, Italic, Underline,
    AlignLeft, AlignRight, AlignCenter,
    Indent, Outdent,
    OrderedList, UnorderedList,
    Undo, Redo, Link, Unlink } = EditorTools;


export default function EditorPage ()  {
        return (
            <Editor tools={[[Bold, Italic, Underline], [Undo, Redo], [Link, Unlink], [AlignLeft, AlignCenter, AlignRight], [OrderedList, UnorderedList, Indent, Outdent]]} contentStyle={{
                height: 700
                }} defaultContent={"<p>Hello, NextJS!</p>"} />
        );
}


