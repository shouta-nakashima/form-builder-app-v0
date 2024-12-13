import { Field } from '../page'

type FormPreviewProps = {
  fields: Field[]
}

export default function FormPreview({ fields }: FormPreviewProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">フォームプレビュー</h2>
      <form className="space-y-4">
        {fields.map((field) => (
          <div key={field.id}>
            <label className="block mb-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === 'textarea' && (
              <textarea
                className="w-full p-2 border rounded"
                required={field.required}
              />
            )}
            {(field.type === 'text' || field.type === 'number' || field.type === 'email') && (
              <input
                type={field.type}
                className="w-full p-2 border rounded"
                required={field.required}
              />
            )}
            {field.type === 'checkbox' && field.options && (
              <div className="space-y-2">
                {field.options.map((option, index) => (
                  <label key={index} className="flex items-center">
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
            {field.type === 'radio' && field.options && (
              <div className="space-y-2">
                {field.options.map((option, index) => (
                  <label key={index} className="flex items-center">
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
          </div>
        ))}
        {fields.length > 0 && (
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            送信
          </button>
        )}
      </form>
    </div>
  )
}

