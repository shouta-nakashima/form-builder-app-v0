"use client"

import { useState, useCallback } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import AddFieldForm from "../components/AddFieldForm"
import FormPreview from "../components/FormPreview"

export type Field = {
  id: string
  type: "text" | "number" | "email" | "textarea" | "checkbox" | "radio"
  label: string
  required: boolean
  options?: string[]
}

export default function FormBuilder() {
  const [fields, setFields] = useState<Field[]>([])

  const addField = (field: Omit<Field, "'id'">) => {
    setFields([...fields, { ...field, id: Date.now().toString() }])
  }

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id))
  }

  const updateField = (id: string, updatedField: Partial<Field>) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updatedField } : field
    ))
  }

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) {
      return
    }

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index

    const newFields = Array.from(fields)
    const [reorderedItem] = newFields.splice(sourceIndex, 1)
    newFields.splice(destinationIndex, 0, reorderedItem)

    setFields(newFields)
  }, [fields])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">フォームビルダー</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <AddFieldForm addField={addField} />
          </div>
          <div className="md:col-span-2">
            <FormPreview fields={fields} removeField={removeField} updateField={updateField} />
          </div>
        </div>
      </div>
    </DragDropContext>
  )
}

