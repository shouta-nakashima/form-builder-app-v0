import { useState } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { Field } from "@/app/page"
import { Trash2, Edit2 } from "lucide-react"
import FieldEditForm from "./FieldEditForm"

type FormPreviewProps = {
  fields: Field[]
  removeField: (id: string) => void
  updateField: (id: string, updatedField: Partial<Field>) => void
}

export default function FormPreview({ fields, removeField, updateField }: FormPreviewProps) {
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null)

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">フォームプレビュー</h2>
      <Droppable droppableId="formPreview">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
            {fields.map((field, index) => (
              <Draggable key={field.id} draggableId={field.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-4 p-4 bg-gray-100 rounded relative group"
                  >
                    <div className="font-bold mb-2 flex justify-between items-center">
                      <span>フィールド {index + 1}</span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditingFieldId(field.id)}
                          className="text-blue-500 mr-2"
                          aria-label="フィールドを編集"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => removeField(field.id)}
                          className="text-red-500"
                          aria-label="フィールドを削除"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    {editingFieldId === field.id ? (
                      <FieldEditForm
                        field={field}
                        updateField={updateField}
                        onClose={() => setEditingFieldId(null)}
                      />
                    ) : (
                      <>
                        <label className="block mb-1">
                          {field.label}
                          {field.required && <span className="text-red-500">*</span>}
                        </label>
                        {field.type === "textarea" && (
                          <textarea
                            className="w-full p-2 border border-neutral-200 rounded dark:border-neutral-800"
                            required={field.required}
                            placeholder={`${field.label}を入力`}
                          />
                        )}
                        {(field.type === "text" || field.type === "number" || field.type === "email") && (
                          <input
                            type={field.type}
                            className="w-full p-2 border border-neutral-200 rounded dark:border-neutral-800"
                            required={field.required}
                            placeholder={`${field.label}を入力`}
                          />
                        )}
                        {field.type === "checkbox" && field.options && (
                          <div className="space-y-2">
                            {field.options.map((option, optionIndex) => (
                              <label key={optionIndex} className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="mr-2"
                                  required={field.required}
                                />
                                {option}
                              </label>
                            ))}
                          </div>
                        )}
                        {field.type === "radio" && field.options && (
                          <div className="space-y-2">
                            {field.options.map((option, optionIndex) => (
                              <label key={optionIndex} className="flex items-center">
                                <input
                                  type="radio"
                                  name={field.id}
                                  className="mr-2"
                                  required={field.required}
                                />
                                {option}
                              </label>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {fields.length > 0 && (
        <form onSubmit={(e) => {
          e.preventDefault();
          // Handle form submission here
          console.log("'Form submitted'");
        }}>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            送信
          </button>
        </form>
      )}
    </div>
  )
}

