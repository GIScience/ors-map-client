# Dynamic fields of the map form

The inputs presented on the map client sidebar are not hardcoded into the application, but instead rendered according
the fields declared in the [ors-map-filters.js](../src/config-examples/ors-map-filters-example.js).
A custom created engine is responsible for reading these filters/fields and for rendering them in the map form.
The map filters declaration supports also relationship and dependencies and the engine react to them, as well as it
will watch for changes in the fields and adjust their visibility, the values and possible values for each field when
a change happens.

## Engine services

The services used to manipulate, render and query the fields declared in `ors-map-filters.js` are the ones below:

- '@/support/dependency-service.js'
- '@/support/map-data-services/ors-param-parser.js'
- '@/support/map-data-services/ors-filter-util.js'

## Field types

The supported field types are the ones listed under `constants.filterTypes`. They are:

- `wrapper` - renders a visual element that wrappers other child fields
- `array` - renders a select or multi-select field
- `string` - used in combination with `isEnum` (boolean) and/or `items` (array) and renders a select or multi-select field
- `steps` - renders a slider field
- `random` - renders a custom field that allow users to set a random value to a filter/parameter
- `text` - renders a text input (type text or number)
- `boolean` - renders a checkbox
- `switch` - renders a switch

## External resources and lists

There are external lists and resources used in the fields/filter declarations. They are:

- '@/resources/lists/route-smoothness'
- '@/resources/lists/surface-types'
- '@/resources/lists/countries'
- '@/resources/lists/grades'
- '@/resources/constants'

## Translations

The labels and tooltips of the fields are rendered by reading a translation resource
`@/resources/i18n/ors-map-filters.i18n.<locale>.js` file equivalent to the locale current active in the app,
using as reference the field/filter `translation_key` or `name`.

## Field structure

The code below shows all the possible properties of a field, but they are not all expected to be used together.
Some are only for certain types of fields.

```js
field = {
  name: String,
  internalName: String, // as `name` must be unique in the scope of the file and the API has support for some parameters that expect different data types depending on the value of another parameter, different types of fields must be rendered depending on the filters' value. In this case, multiple fields declared would have the same name, but with distinct rules. Therefore, `internalName` will contain the name of the parameter expected by the API. For example: `interval` accepts a time or a distance interval and fields with different UIs must be rendered for time or distance fields. But, both of them (that will never be rendered at the same time) will end up by generating a API parameter named `interval` and containing the value of `distance_interval` or `time_interval`.
  useInServices: List[String], // each item must be a constant present in `constants.services.*`
  hidden: Boolean, // If the field must not be automatically rendered, but instead rendered with a custom code using a type of element not supported by the engine. One example is the `profile` or avoid_polygons filters/parameters.
  required: Boolean,
  type: String, // the type must be a constant present in `constants.filterTypes.*` and determines the type of HTML element displayed
  enum: Array, // list of options of a field
  mapping: {
    // Object // with the following structure:
    // String, usually the same of the slug, like 'cycling-regular'
    "map-key": {
      slug: String, // semantic unique identifier,
      icon: String, // a valid material design icon string,
      nestedProfiles: List[String], // possibilities: 'cycling-regular', 'cycling-road', 'cycling-electric' and 'cycling-mountain'
      supportsTrailDifficulty: Boolean,
    },
  },
  availableOnModes: List[String], // each item must be a constant present in `constants.modes.*`
  isEnum: Boolean, // determines if the field is a list of values that should be presented as a select-like input,
  separator: String, // determines how the options selected must be concatenated when the expected API parameter expects a single value (a string with a separator)
  default: Any, // the default value of the field - it can be a string, a boolean, a Number, array or object. The default value will be added to the request even if the field value is empty.
  value: "*", // the value of the field - it can be a string, a boolean, a Number, array or object.
  unit: String, // the unit label that must be presented on the side of a field, like 'kmh', 'min', 'km',
  min: Number, // min value of number field
  max: Number, // max value of number field
  multiplyValueBy: Number, // some fields expect a value that when expressed in the expected unit are too big to be displayed/inputted. Like `meters`. So, in this case, for example, km can be used as unit and the value inputted, like 1 will be multiplied by `multiplyValueBy` before added to the request.
  valueAsArray: Boolean, // if the the value of a multiple options field must be sent to the API as an array.
  step: Number, // the increasing step for a number input,
  visibleWhen: [
    // Array of objects containing each an object with the following structure:
    {
      ref: "range_type",
      value: "distance",
    },
  ],
  validWhen: [
    // Array of objects containing conditions to determine if the filter/field is valid. If the field is considered not valid, its value will not be part of the request.
    {
      ref: String, // the path to another filter/field in the ors-map-filters.js structure. For example 'range_type' (the filter is at the root level) or 'alternative_routes.props.target_count' in an example where the navigation to the filter is informed, `self` can also be used so that the condition will look for the filter itself and evaluate it value, min or max
      value: String | List[String], // like 'distance' or ['driving-hgv', 'wheelchair', 'foot-*']. The mask * is accepted.
      min: Number, // the min value of a filter/field
    },
  ],
  visibleWhen: [
    // Array of objects containing conditions to determine if the filter/field is visible.
    {
      ref: String, // the path to another filter/field in the ors-map-filters.js structure. For example 'range_type' (the filter is at the root level) or 'alternative_routes.props.target_count' in an example where the navigation to the filter is informed, `self` can also be used so that the condition will look for the filter itself and evaluate it value, min or max
      value: String | List[String], // like 'distance' or ['driving-hgv', 'wheelchair', 'foot-*']. The mask * is accepted.
      min: Number, // the min value of a filter/field
    },
  ],
  valuesRestrictions: [
    // Array of objects containing conditions that might determine the value of some of the field properties, like value, min and max
    {
      ref: "profile", // the filter/field that should be watched
      valuesWhen: {
        // when the target field has one of the values (or part of it), like 'driving-*'
        "driving-*": {
          max: [{ ref: "time_range" }, 60], // the `max` value must be set as the value of the 'time_range' field or, if it is not set, as 60.
          min: [{ ref: "time_range", calc: { dividedBy: 9 }, min: 1 }], // the `min` must be set as the result of value of the 'time_range' divided by 9 field, and it must be at least 1.
          value: "*", // the value of the field mut be set as the define value (it can be anything, Sting, Object, Number etc)
        },
      },
    },
  ],
  valueAsObject: Boolean, // if the field value must be stringified or sent as an object.
  props: List, // list of child filters/fields that might contain the same properties and even other props and children. To be correctly rendered, the field which has props must be of the type `wrapper`. When the API parameters are built, the values of all children will be aggregated and set as the wrapper parent as its value, having the prop.name/prop.internalName as the key.
  apiDefault: "*", // the value that must be sent to the API if no value is defined using the UI.
  multiSelect: Boolean, // if more then one value can be selected in this field/filter
  // Array of Objects containing the definitions that will determine the options that are available depending the value of other filter/field.
  itemRestrictions: [
    {
      ref: String, // the name of the filter/field to be watched.
      itemsWhen: {
        // the options that should be listed depending on the value of the watched field
        "driving-*": [
          // in this case, if the watched field has as its value something starting with `driving-` then the options available are the one listed
          "highways",
          "tollways",
          "ferries",
        ],
      },
    },
  ],
  items: List[Object], // containing the options that will be present in the field. This mostly used to outsource the items, when it is a big list.
  itemValue: String, // like 'value' - used in combination with items and to determine which property in each item from items should be used as the option value.
  translation_key: String, // an specific key in the translation resource that should be used to generate the UI text, like 'round_trip_length',
  multiplyValueBy: Number, // the multiplier that must be used to multiply the value for before the API request is built. It is used to avoid big numbers in the UI, like meters/kilometers
};
```
