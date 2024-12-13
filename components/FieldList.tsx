import { Field } from '../page'

type FieldListProps = {
  fields: Field[]
  removeField: (id: string) => void
}

export default function FieldList({ fields, removeField }: FieldListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">フィールドリスト</h2>
      <ul>
        {fields.map((field) => (
          <li key={field.id} className="mb-2 p-2 border rounded flex justify-between items-center">
            <span>
              {field.label} ({field.type}) {field.required && '(必須)'}
              {field.options && ` [${field.options.join(', ')}]`}
            </span>
            <button
              onClick={() => removeField(field.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

