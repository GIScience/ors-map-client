
export default {
  orsMapFilters: {
    profiles: {
      'cycling-regular': 'Ciclismo regular',
      'cycling-road': 'Ciclismo de estrada',
      'cycling-electric': 'Ciclismo com bicicleta elétrica',
      'cycling-mountain': 'Montainbike',
      'cycling-safe': 'Ciclismo seguro',
      'foot-walking': 'A pé',
      'foot-hiking': 'Caminhada recreativa',
      'driving-car': 'Carro',
      'driving-hgv': 'Veículo pesado',
      'wheelchair': 'Cadeira de rodas'
    },
    filters: {
      preference: {
        label: 'Preferências de rota',
        description: 'O fator preferencial a ser considerado no cálculo das rotas',
        enum: {
          'fastest': 'Mais rápida',
          'shortest': 'Mais curta',
          'recommended': 'Recomendada'
        }
      },
      range_type: {
        label: 'Método de isócrono',
        description: 'Método usado para calcular o isócrono',
        enum: {
          'time': 'Tempo',
          'distance': 'Distância'
        }
      },
      range: {
        label: 'Faixa',
        description: 'A faixa máxima dos isócronos a serem calculados'
      },
      interval: {
        label: 'Intervalo',
        description: 'O intervalo a ser usado no cáculo de isócronos'
      },
      options: {
        label: 'Opções da rota'
      },
      profile_params: {
        label: 'Parâmetros de perfil'
      },
      restrictions: {
        label: 'Restrições'
      },
      maximum_incline: {
        label: 'Inclinação máxima',
        description: 'Inclinação máxima em percentual'
      },
      maximum_sloped_kerb: {
        label: 'Altura máxima do meio-fio',
        description: 'Especifica a altura máxima do meio-fio em metros'
      },
      minimum_width: {
        label: 'Largura mínima calçada',
        description: 'Especifica a largura mínima da alçada em metros'
      },
      smoothness_type: {
        label: 'Suavidade de rota',
        description: 'Especifica a suavidade mínima da rota. Mais informações em https://wiki.openstreetmap.org/wiki/Key:smoothness'
      },
      surface_type: {
        label: 'Tipo mínimo de superfície',
        description: 'Especifica o tipo mínimo de superfície. Ordem de tipos: https://wiki.openstreetmap.org/wiki/Key:surface'
      },
      track_type: {
        label: 'Nota mínima da rota',
        description: 'Especifica uma nota mínima para a rota. Valores das notas: https://wiki.openstreetmap.org/wiki/Key:tracktype'
      },
      round_trip: {
        label: 'Rota circular'
      },
      length: {
        label: 'Distância da rota circular',
        description: 'A distância alvo para a rota circular (note que este é um valor desejado, mas os resultados podem ser diferentes).'
      },
      points: {
        label: 'Pontos',
        description: 'O número de pontos a serem utilizados na rota. Os valores maiores criam mais rotas circulares.'
      },
      seed: {
        label: 'Semente aleatória',
        description: 'Uma semente aleatória a ser utilizada para adicionar aleatoriedade à rota gerada (min:0, max: 90)'
      },
      avoid_polygons: {
        label: 'Elementos a evitar',
        description: 'Elementos a evitar'
      },
      avoid_features: {
        label: 'Polígonos a evitar',
        description: 'Polígonos a evitar',
        enum: {
          'highways': 'Auto-estradas',
          'tollways': 'Pedágios',
          'ferries': 'Ferries',
          'tunnels': 'Túneis',
          'fords': 'Vau',
          'steps': 'Degrais',
        }
      },
      avoid_borders: {
        label: 'Fronteiras a evitar',
        description: 'Fronteiras a evitar',
        enum: {
          'all': 'Todas',
          'controlled': 'Controladas'
        }
      },
      avoid_countries: {
        label: 'Países a evitar',
        description: 'Países a evitar'
      },
      alternative_routes: {
        label: 'Rotas alternativas'
      },
      target_count: {
        label: 'Número de rotas',
        description: 'Número alvo de rotas alternativas a calcular. O serviço retorna até este número de rotas que preenchem as restrições do fator de ação e do fator de peso.'
      },
      share_factor: {
        label: 'Fator de compartilhamento',
        description: 'Fração máxima da rota que as alternativas podem compartilhar com a rota ideal. O valor padrão de 0,6 significa que as alternativas podem compartilhar até 60% dos segmentos da rota com a rota ótima.'
      },
      weight_factor: {
        label: 'Fator de peso',
        description: 'O fator máximo pelo qual o peso da rota pode divergir da rota ideal. O valor padrão de 1,4 significa que as alternativas podem ser até 1,4 vezes mais longas do que a rota ideal.'
      }
    }
  }
}
