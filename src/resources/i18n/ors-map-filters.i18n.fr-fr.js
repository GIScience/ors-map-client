export default {
  'orsMapFilters': {
    'profiles': {
      'cycling-regular': 'Vélo',
      'cycling-road': 'Route vélo',
      'cycling-electric': 'Vélo électrique',
      'cycling-mountain': 'Vélo de montagne',
      'cycling-safe': 'Cyclisme en sécurité',
      'foot-walking': 'À pied',
      'foot-hiking': 'Randonnée',
      'driving-car': 'Voiture',
      'driving-hgv': 'Véhicule lourd',
      'wheelchair': 'Fauteuil roulant',
      'hgv': 'éhicule lourd',
      'bus': 'Bus',
      'agricultural': 'Véhicule agricole',
      'delivery': 'Camion de livraison',
      'forestry': 'Camion forestier',
      'goods': 'Camion de marchandises'
    },
    'filters': {
      'preference': {
        'label': 'Préférence d\'itinéraire',
        'description': 'Le facteur préféré à prendre en compte lors du calcul des itinéraires',
        'enum': {
          'fastest': 'Le plus rapide',
          'shortest': 'Le plus court',
          'recommended': 'Recommandé'
        }
      },
      'range_type': {
        'label': 'Méthode isochrone',
        'description': 'Méthode utilisée pour calculer l\'isochrone',
        'enum': {
          'time': 'Temps',
          'distance': 'Distance'
        }
      },
      'time_range': {
        'label': 'Gamme',
        'description': 'La gamme maximale des isochrones à calculer'
      },
      'distance_range': {
        'label': 'Gamme',
        'description': 'La gamme maximale des isochrones à calculer'
      },
      'time_interval': {
        'label': 'Intervalle',
        'description': 'L\'intervalle des isochrones à calculer'
      },
      'distance_interval': {
        'label': 'Intervalle',
        'description': 'L\'intervalle des isochrones à calculer'
      },
      'options': {
        'label': 'Options'
      },
      'profile_params': {
        'label': 'Paramètres de profil'
      },
      'restrictions': {
        'label': 'Restrictions'
      },
      'axleload': {
        'label': 'Charge de l\'essieu',
        'description': 'La charge maximale par essieu en tonnes'
      },
      'height': {
        'label': 'Hauteur',
        'description': 'La hauteur maximale en mètres. Les limites ne sont pas obligatoires sur le serveur et sont présentes sur le client uniquement pour empêcher la définition de valeurs déraisonnables. Des valeurs trop élevées peuvent conduire à des itinéraires irréalisables lorsque les données requises ne sont pas actuellement présentes dans la base de données OpenStreetMap.'
      },
      'length': {
        'label': 'Longueur',
        'description': 'La longueur maximale en mètres. Les limites ne sont pas obligatoires sur le serveur et sont présentes sur le client uniquement pour empêcher la définition de valeurs déraisonnables. Des valeurs trop élevées peuvent conduire à des itinéraires irréalisables lorsque les données requises ne sont pas actuellement présentes dans la base de données OpenStreetMap.'
      },
      'weight': {
        'label': 'Poids',
        'description': 'Le poids maximum en tonnes'
      },
      'width': {
        'label': 'Largeur',
        'description': 'La largeur maximale en mètres. Les limites ne sont pas obligatoires sur le serveur et sont présentes sur le client uniquement pour empêcher la définition de valeurs déraisonnables. Des valeurs trop élevées peuvent conduire à des itinéraires irréalisables lorsque les données requises ne sont pas actuellement présentes dans la base de données OpenStreetMap.'
      },
      'hazmat': {
        'label': 'Produits dangereux',
        'description': 'Transport de produits dangereuses'
      },
      'maximum_incline': {
        'label': 'Inclinaison maximale',
        'description': 'L\'inclinaison maximale en pourcentage'
      },
      'maximum_sloped_kerb': {
        'label': 'Hauteur de trottoir maximale',
        'description': 'Spécifie la hauteur maximale de la bordure inclinée en mètres'
      },
      'minimum_width': {
        'label': 'Largeur minimale de la passerelle',
        'description': 'Spécifie la largeur minimale de la passerelle en mètres'
      },
      'smoothness_type': {
        'label': 'La fluidité de l\'itinéraire',
        'description': 'Spécifie la fluidité minimale de l\'itinéraire. Plus d\'infos: https://wiki.openstreetmap.org/wiki/Key:smoothness'
      },
      'surface_type': {
        'label': 'Min. type de surface',
        'description': 'Spécifie le type de surface minimum. Ordre de type: https://wiki.openstreetmap.org/wiki/Key:surface'
      },
      'track_type': {
        'label': 'Classe minimale de l\'itinéraire',
        'description': 'Spécifie la pente minimale de l\'itinéraire. Valeurs de note: https://wiki.openstreetmap.org/wiki/Key:tracktype'
      },
      'round_trip': {
        'label': 'Route circulaire'
      },
      'round_trip_length': {
        'label': 'Durée de la route circulaire',
        'description': 'La longueur cible de l\'itinéraire (notez qu\'il s\'agit d\'une valeur préférée, mais les résultats peuvent être différents).'
      },
      'points': {
        'label': 'Points',
        'description': 'Le nombre de points à utiliser sur l\'itinéraire. Des valeurs plus élevées créent plus d\'itinéraires circulaires.'
      },
      'seed': {
        'label': 'Graine aléatoire',
        'description': 'Une graine aléatoire à utiliser pour ajouter une randomisation à l\'itinéraire généré (min: 0, max: 90)'
      },
      'avoid_polygons': {
        'label': 'polygones à évitez',
        'description': 'olygones à évitez dans la route'
      },
      'avoid_features': {
        'label': 'Choses à éviter',
        'description': 'Choses à éviter dans la route',
        'enum': {
          'highways': 'Autoroutes',
          'tollways': 'Péages',
          'ferries': 'Ferries',
          'tunnels': 'Tunnels',
          'hills': 'Collines',
          'fords': 'Gué',
          'steps': 'Marches',
          'pavedroads': 'Routes pavées',
          'unpavedroads': 'Des routes non pavées'
        }
      },
      'avoid_borders': {
        'label': 'Évitez les frontières',
        'description': 'Évitez les frontières',
        'enum': {
          'all': 'Toutes',
          'controlled': 'Contrôlé'
        }
      },
      'avoid_countries': {
        'label': 'Évitez les pays',
        'description': 'Évitez les pays'
      },
      'alternative_routes': {
        'label': 'Itinéraires alternatifs'
      },
      'target_count': {
        'label': 'Nombre d\'itinéraires',
        'description': 'Nombre cible d\'itinéraires alternatifs à calculer. Le service renvoie jusqu\'à ce nombre d\'itinéraires qui remplissent les contraintes de facteur de partage et de facteur de pondération.'
      },
      'share_factor': {
        'label': 'Facteur de partage',
        'description': 'Fraction maximale de l\'itinéraire que les alternatives peuvent partager avec l\'itinéraire optimal. La valeur par défaut de 0,6 signifie que les alternatives peuvent partager jusqu\'à 60% des segments de chemin avec l\'itinéraire optimal.'
      },
      'weight_factor': {
        'label': 'Facteur de poids',
        'description': 'Facteur maximum par lequel le poids de l\'itinéraire peut diverger de l\'itinéraire optimal. La valeur par défaut de 1,4 signifie que les alternatives peuvent être jusqu\'à 1,4 fois plus longues (coûteuses) que l\'itinéraire optimal.'
      },
      'maximum_speed': {
        'label': 'Vitesse maximum',
        'description': 'Une limite de vitesse maximale qui doit être appliquée',
      },
      'weightings': {
        'label': 'Paramètres additionnels'
      },
      'green': {
        'label': 'Vert (uniquement en Allemagne)',
        'description': 'Préférez les espaces verts (disponible uniquement pour l\'Allemagne)',
      },
      'quiet': {
        'label': 'Calme (Allemagne uniquement)',
        'description': 'Préfère les zones calmes (uniquement disponible pour l\'Allemagne)',
      },
      'surface_quality_known': {
        'label': 'Uniquement des surfaces de qualité connue',
        'description': 'Force l\'utilisation des seules arêtes dont la qualité de surface est explicitement connue',
      },
      'allow_unsuitable': {
        'label': 'Permettre inadéquat',
        'description': 'Permet l\'utilisation de bords qui pourraient ne pas convenir aux fauteuils roulants qui étaient auparavant exclus',
      },
      'vehicle_type': {
        'label': 'Type de véhicule',
        'description': 'Type de véhicule à considérer pour le calcul d\'itinéraire',
      }
    }
  }
}
