import {
  Button,
  Checkbox,
  Datepicker,
  FileInput,
  Label,
  Radio,
  RangeSlider,
  Select,
  Textarea,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";

export default function GeneralForm({FormFields,FormTitle}:{FormFields:any[],FormTitle:string}) {
  return (
    <div>
      <div className="bg-gray-200 rounded-md mb-1  dark:bg-white dark:text-black">
        <p className=" text-2xl">{FormTitle}</p>
      </div>
      <form>
        {FormFields.map((field,id) => {
          return (
            <div key={id} className="flex max-w-md flex-col gap-4">
              <Label>{field.label}</Label>
                {field.type === "TextInput" && <TextInput className="w-full" placeholder={field.placeholder} />}
                {field.type === "Textarea" && <Textarea className="w-full" placeholder={field.placeholder} rows={5} />}
                {field.type === "Select" && <Select className="w-full" placeholder={field.placeholder} />}
                {field.type === "Checkbox" && <Checkbox  />}
                {field.type === "Radio" && <Radio />}
                {field.type === "Range" && <RangeSlider className="w-full" />}
                {field.type === "File" && <FileInput />}
                {field.type === "Datepicker" && <Datepicker />}
            </div>
          );
        })

}
      </form>
    </div>
  );
}
