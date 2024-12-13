import { useState } from 'react'
import { Field } from '@/app/page'

type AddFieldFormProps = {
  addField: (field: Omit<Field, 'id'>) => void
}

export default function AddFieldForm({ addField }: AddFieldFormProps) {
  const [field, setField] = useState<Omit<Field, 'id'>>({
    type: 'text',
    label: '',
    required: false,
  })
  const [options, setOptions] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newField = { ...field }
    if (field.type === 'checkbox' || field.type === 'radio') {
      newField.options = options.split(',').map(option => option.trim())
    }
    addField(newField)
    setField({ type: 'text', label: '', required: false })
    setOptions('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="block mb-1">
          フィールドタイプ:
          <select
            value={field.type}
            onChange={(e) => setField({ ...field, type: e.target.value as Field['type'] })}
            className="w-full p-2 border rounded"
          >
            <option value="text">テキスト</option>
            <option value="number">数値</option>
            <option value="email">メール</option>
            <option value="textarea">テキストエリア</option>
            <option value="checkbox">チェックボックス</option>
            <option value="radio">ラジオボタン</option>
          </select>
        </label>
      </div>
      <div className="mb-2">
        <label className="block mb-1">
          ラベル:
          <input
            type="text"
            value={field.label}
            onChange={(e) => setField({ ...field, label: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </label>
      </div>
      {(field.type === 'checkbox' || field.type === 'radio') && (
        <div className="mb-2">
          <label className="block mb-1">
            オプション (カンマ区切り):
            <input
              type="text"
              value={options}
              onChange={(e) => setOptions(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </label>
        </div>
      )}
      <div className="mb-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => setField({ ...field, required: e.target.checked })}
            className="mr-2"
          />
          必須
        </label>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        フィールドを追加
      </button>
    </form>
  )
}

