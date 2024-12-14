import { useState } from "react"
import { Field } from "@/app/page"

type FieldEditFormProps = {
  field: Field
  updateField: (id: string, updatedField: Partial<Field>) => void
  onClose: () => void
}

export default function FieldEditForm({ field, updateField, onClose }: FieldEditFormProps) {
  const [editedField, setEditedField] = useState<Field>(field)

  const handleSubmit = () => {
    updateField(field.id, editedField)
    onClose()
  }

  return (
    <div className="space-y-4 bg-white p-4 rounded shadow-lg">
      <div>
        <label className="block mb-1">
          ラベル:
          <input
            type="text"
            value={editedField.label}
            onChange={(e) => setEditedField({ ...editedField, label: e.target.value })}
            className="w-full p-2 border border-neutral-200 rounded dark:border-neutral-800"
            required
          />
        </label>
      </div>
      <div>
        <label className="block mb-1">
          タイプ:
          <select
            value={editedField.type}
            onChange={(e) => setEditedField({ ...editedField, type: e.target.value as Field["type"] })}
            className="w-full p-2 border border-neutral-200 rounded dark:border-neutral-800"
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
      {(editedField.type === "checkbox" || editedField.type === "radio") && (
        <div>
          <label className="block mb-1">
            オプション (カンマ区切り):
            <input
              type="text"
              value={editedField.options?.join("', '") || "''"}
              onChange={(e) => setEditedField({ ...editedField, options: e.target.value.split("','").map(o => o.trim()) })}
              className="w-full p-2 border border-neutral-200 rounded dark:border-neutral-800"
              required
            />
          </label>
        </div>
      )}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={editedField.required}
            onChange={(e) => setEditedField({ ...editedField, required: e.target.checked })}
            className="mr-2"
          />
          必須
        </label>
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
          キャンセル
        </button>
        <button type="button" onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
          保存
        </button>
      </div>
    </div>
  )
}

