'use client'

import { useState } from 'react'
import AddFieldForm from '../components/AddFieldForm'
import FieldList from '../components/FieldList'
import FormPreview from '../components/FormPreview'

export type Field = {
  id: string
  type: 'text' | 'number' | 'email' | 'textarea' | 'checkbox' | 'radio'
  label: string
  required: boolean
  options?: string[] // チェックボックスとラジオボタン用
}

export default function FormBuilder() {
  const [fields, setFields] = useState<Field[]>([])

  const addField = (field: Omit<Field, 'id'>) => {
    setFields([...fields, { ...field, id: Date.now().toString() }])
  }

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">フォームビルダー</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <AddFieldForm addField={addField} />
          <FieldList fields={fields} removeField={removeField} />
        </div>
        <div>
          <FormPreview fields={fields} />
        </div>
      </div>
    </div>
  )
}