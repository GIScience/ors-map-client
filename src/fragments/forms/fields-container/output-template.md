
# PARAMETERS ARRAY EXAMPLE #

 The parameters list must have the following structure

  ```yaml
   [
    {
      name: String,
      required: boolean,
      type: String (text, select, switch)
      in: String (query|body|header),
      description: String,
      default: String|Array (nullable),
      isEnum: boolean,
      enum: [Value1, Value2,...],
      value: String|boolean,
      label: String,
      inputType: String
      inputTypeStep: Integer|null
      separator: String|null
      example: String|Object
      apiDefault: Object|String,
      props (optional): {
        [index]: {
          name: String (unique)
          type: String
          description: String,
          label: String
        }
      }
    },
    ...
  ]
  ```
