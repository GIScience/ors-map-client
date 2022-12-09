
export default {
  orsMapFilters: {
    profiles: {
      'cycling-regular': 'Ciclismo regular',
      'cycling-road': 'Ciclismo de estrada',
      'cycling-electric': 'E-bike',
      'cycling-mountain': 'Mountainbike',
      'cycling-safe': 'Ciclismo seguro',
      'foot-walking': 'A pé',
      'foot-hiking': 'Caminhada recreativa',
      'driving-car': 'Carro',
      'driving-hgv': 'Veículo pesado',
      'wheelchair': 'Cadeira de rodas',
      'hgv': 'Veículo pesado',
      'bus': 'Ônibus',
      'agricultural': 'Veículo agrícola',
      'delivery': 'Caminhão de entrega',
      'forestry': 'Caminhão florestal',
      'goods': 'Caminhão de carga'
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
      time_range: {
        label: 'Faixa',
        description: 'A faixa máxima dos isócronos a serem calculados'
      },
      distance_range: {
        label: 'Faixa',
        description: 'A faixa máxima dos isócronos a serem calculados'
      },
      time_interval: {
        label: 'Intervalo',
        description: 'O intervalo a ser usado no cáculo de isócronos'
      },
      distance_interval: {
        label: 'Intervalo',
        description: 'O intervalo a ser usado no cáculo de isócronos'
      },
      options: {
        label: 'Opções'
      },
      profile_params: {
        label: 'Parâmetros de perfil'
      },
      restrictions: {
        label: 'Restrições'
      },
      axleload: {
        label: 'Carga do eixo',
        description: 'A carga máxima por eixo em toneladas'
      },
      height: {
        label: 'Altura',
        description: 'A altura máxima em metros'
      },
      length: {
        label: 'Comprimento',
        description: 'O comprimento máximo em metros'
      },
      weight: {
        label: 'Peso',
        description: 'O peso máximo em toneladas'
      },
      width: {
        label: 'Largura',
        description: 'A largura máxima em metros. Os limites não são mandatórios no servidor e estão presentes no cliente somente para evitar que valores não razoáveis sejam definidos. Valores muito altos podem gerar a rotas inviáveis quando os dados necessários não estiverem no presentes no banco de dados do OpenStreetMap.'
      },
      hazmat: {
        label: 'Produtos perigosos',
        description: 'Transporte de mercadorias perigosas'
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
      round_trip_length: {
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
        label: 'Polígonos a evitar',
        description: 'Polígonos a evitar'
      },
      avoid_features: {
        label: 'Elementos a evitar',
        description: 'Elementos a evitar',
        enum: {
          'highways': 'Auto-estradas',
          'tollways': 'Pedágios',
          'ferries': 'Ferries',
          'hills': 'Colinas',
          'tunnels': 'Túneis',
          'fords': 'Passo de rio',
          'steps': 'Escadaria',
          'pavedroads': 'Rodovias pavimentadas',
          'unpavedroads': 'Rodovias não pavimentadas'
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
      },
      maximum_speed: {
        label: 'Velocidade máxima',
        description: 'Uma velocidade máxima que deve ser aplicada',
      },
      weightings: {
        label: 'Parâmetros adicionais'
      },
      green: {
        label: 'Verde (somente na Alemanha)',
        description: 'Prefira áreas verdes (disponível apenas para Alemanha)',
      },
      quiet: {
        label: 'Silencioso (apenas Alemanha)',
        description: 'Prefere áreas tranquilas (disponível apenas para Alemanha)',
      },
      surface_quality_known: {
        label: 'Somente superfícies com qualidade conhecida',
        description: 'Força o uso apenas de quinas onde a qualidade da superfície é explicitamente conhecida',
      },
      allow_unsuitable: {
        label: 'Permitir inadequado',
        description: 'Permite o uso de quinas que podem ser inadequadas para cadeira de rodas que anteriormente eram excluídas',
      },
      vehicle_type: {
        label: 'Tipo de veículo',
        description: 'Tipo de veículo a ser considerado para o cálculo da rota',
      }
    }
  }
}
