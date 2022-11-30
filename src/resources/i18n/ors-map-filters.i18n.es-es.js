
export default {
  orsMapFilters: {
    'profiles': {
      'cycling-regular': 'Ciclismo regular',
      'cycling-road': 'Ciclismo de estrada',
      'cycling-electric': 'Bicicleta eléctrica',
      'cycling-mountain': 'Ciclismo de montaña',
      'cycling-safe': 'Ciclismo seguro',
      'foot-walking': 'A pie',
      'foot-hiking': 'Caminhada recreativa',
      'driving-car': 'Coche',
      'driving-hgv': 'Vehículo pesado',
      'wheelchair': 'Silla de ruedas',
      'hgv': 'Vehículo pesado',
      'bus': 'Autobús',
      'agricultural': 'Vehículo agrícola',
      'delivery': 'Camión de reparto',
      'forestry': 'Camión forestal',
      'goods': 'Camión de carga'
    },
    'filters': {
      'preference': {
        'label': 'Preferencias de ruta',
        'description': 'El factor preferente que se debe considerar en el cálculo de las rutas',
        'enum': {
          'fastest': 'Más rápida',
          'shortest': 'Más corta',
          'recommended': 'Recomendada'
        }
      },
      'range_type': {
        'label': 'Método de isócrona',
        'description': 'Método utilizado para calcular la isócrona',
        'enum': {
          'time': 'Tiempo',
          'distance': 'Distancia'
        }
      },
      'time_range': {
        'label': 'Faixa',
        'description': 'A faixa máxima dos isócronas a serem calculados'
      },
      'distance_range': {
        'label': 'Gama',
        'description': 'A faixa máxima dos isócronas a serem calculados'
      },
      'time_interval': {
        'label': 'Intervalo',
        'description': 'O intervalo a ser usado no cáculo de isócronas'
      },
      'distance_interval': {
        'label': 'Intervalo',
        'description': 'O intervalo a ser usado no cáculo de isócronas'
      },
      'options': {
        'label': 'Opciones'
      },
      'profile_params': {
        'label': 'Parámetros del perfil'
      },
      'restrictions': {
        'label': 'Restricciones'
      },
      'axleload': {
        'label': 'Carga por eje',
        'description': 'La carga máxima por eje en toneladas'
      },
      'height': {
        'label': 'Altura',
        'description': 'La altura máxima en metros. Los límites no son obligatorios en el servidor y están presentes en el cliente solo para evitar que se establezcan valores irrazonables. Los valores que son demasiado altos pueden llevar a rutas inviables cuando los datos requeridos no están presentes actualmente en la base de datos de OpenStreetMap.'
      },
      'length': {
        'label': 'Longitud',
        'description': 'La longitud máxima en metros. Los límites no son obligatorios en el servidor y están presentes en el cliente solo para evitar que se establezcan valores irrazonables. Los valores que son demasiado altos pueden llevar a rutas inviables cuando los datos requeridos no están presentes actualmente en la base de datos de OpenStreetMap.'
      },
      'weight': {
        'label': 'Peso',
        'description': 'El peso máximo en toneladas'
      },
      'width': {
        'label': 'Anchura',
        'description': 'La anchura máxima en metros. Los límites no son obligatorios en el servidor y están presentes en el cliente solo para evitar que se establezcan valores irrazonables. Los valores que son demasiado altos pueden llevar a rutas inviables cuando los datos requeridos no están presentes actualmente en la base de datos de OpenStreetMap.'
      },
      'hazmat': {
        'label': 'Productos peligrosos',
        'description': 'Transporte de mercancías peligrosas'
      },
      'maximum_incline': {
        'label': 'Inclinación máxima',
        'description': 'Inclinación máxima en porcentaje'
      },
      'maximum_sloped_kerb': {
        'label': 'Altura máxima del bordillo',
        'description': 'Especifica la altura máxima del bordillo en metros'
      },
      'minimum_width': {
        'label': 'Anchura mínima de la acera',
        'description': 'Especifica la anchura mínima de la acera en metros'
      },
      'smoothness_type': {
        'label': 'Suavidad de la ruta',
        'description': 'Especifica la suavidad mínima de la ruta. Puede encontrar más información en https://wiki.openstreetmap.org/wiki/Key:smoothness'
      },
      'surface_type': {
        'label': 'Tipo mínimo de superficie',
        'description': 'Especifica el tipo mínimo de superficie. Orden de los tipos: https://wiki.openstreetmap.org/wiki/Key:surface'
      },
      'track_type': {
        'label': 'Puntuación mínima de la ruta',
        'description': 'Especifica una puntuación mínima para la ruta. Valores de las notas: https://wiki.openstreetmap.org/wiki/Key:tracktype'
      },
      'round_trip': {
        'label': 'Ruta circular'
      },
      'round_trip_length': {
        'label': 'Distancia de la ruta circular',
        'description': 'La distancia objetivo para la ruta circular (tenga en cuenta que este es un valor deseado, pero los resultados pueden ser diferentes).'
      },
      'points': {
        'label': 'Puntos',
        'description': 'El número de puntos a utilizar para la ruta. Los valores más grandes crean rutas más circulares.'
      },
      'seed': {
        'label': 'Semilla aleatoria',
        'description': 'Una semilla aleatoria que se utilizará para añadir aleatoriedad a la ruta generada (min:0, max: 90)'
      },
      'avoid_polygons': {
        'label': 'Polígonos a evitar',
        'description': 'Polígonos a evitar'
      },
      'avoid_features': {
        'label': 'Elementos a evitar',
        'description': 'Elementos a evitar',
        'enum': {
          'highways': 'Autopistas',
          'tollways': 'Peajes',
          'ferries': 'Ferries',
          'hills': 'Colinas',
          'tunnels': 'Túneis',
          'fords': 'Paso del río',
          'steps': 'Escalera',
          'pavedroads': 'Carreteras pavimentadas',
          'unpavedroads': 'Carreteras sin asfaltar'
        }
      },
      'avoid_borders': {
        'label': 'Fronteras que hay que evitar',
        'description': 'Fronteras que hay que evitar',
        'enum': {
          'all': 'Todas',
          'controlled': 'Controladas'
        }
      },
      'avoid_countries': {
        'label': 'Países a evitar',
        'description': 'Países a evitar'
      },
      'alternative_routes': {
        'label': 'Rutas alternativas'
      },
      'target_count': {
        'label': 'Número de rutas',
        'description': 'Número objetivo de rutas alternativas a calcular. El servicio devuelve hasta este número de rutas que satisfacen las restricciones del factor de acción y del factor de peso.'
      },
      'share_factor': {
        'label': 'Factor de compartición',
        'description': 'Fracción máxima de la ruta que las alternativas pueden compartir con la ruta óptima. El valor por defecto de 0,6 significa que las alternativas pueden compartir hasta el 60% de los segmentos de la ruta con la ruta óptima.'
      },
      'weight_factor': {
        'label': 'Factor de peso',
        'description': 'El factor máximo por el que el peso de la ruta puede desviarse de la ruta óptima. El valor por defecto de 1,4 significa que las alternativas pueden ser hasta 1,4 veces más largas que la ruta óptima.'
      },
      'maximum_speed': {
        'label': 'Velocidad máxima',
        'description': 'Una velocidad máxima que debe aplicarse'
      },
      'weightings': {
        'label': 'Ajustes adicionales'
      },
      'green': {
        'label': 'Verde (solo en Alemania)',
        'description': 'Preferir áreas verdes (solo disponible para Alemania)',
      },
      'quiet': {
        'label': 'Tranquilo (solo Alemania)',
        'description': 'Prefiere zonas tranquilas (solo disponible para Alemania)',
      },
      'surface_quality_known': {
        'label': 'Sólo superficies con calidad conocida',
        'description': 'Fuerza el uso solo de los bordes donde la calidad de la superficie se conoce explícitamente',
      },
      'allow_unsuitable': {
        'label': 'Permitir inadecuada',
        'description': 'Permite el uso de bordes que podrían no ser adecuados para sillas de ruedas que antes estaban excluidos',
      },
      'vehicle_type': {
        'label': 'Tipo de vehículo',
        'description': 'Tipo de vehículo a considerar para el cálculo de la ruta',
      }

    }
  }
}
