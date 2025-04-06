export const categories = {
    luxury: "Luxury Cars",
    sports: "Sports Cars",
    electric: "Electric Vehicles",
    cruiser: "Cruiser Bikes",
    sport_bikes: "Sport Bikes",
    classic: "Classic Motorcycles"
  };
  
  // Vehicle data
  export const vehicles = {
    cars: [
      { 
        id: 1, 
        name: 'Tesla Model S',
        category: 'electric',
        price: 80000,
        images: [
          'https://images.unsplash.com/photo-1617788138017-80ad40651399',
          'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5',
          'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5'
        ],
        isNew: true,
        video: 'https://www.youtube.com/embed/3R3J1FpjWcE',
        seller: {
          name: "John Smith",
          experience: "15+ years",
          phone: "+1 (555) 123-4567",
          email: "john.smith@example.com",
          location: "Los Angeles, CA",
          description: "Certified Tesla specialist with extensive experience in electric vehicles. Providing detailed vehicle history and maintenance records."
        },
        details: "The Tesla Model S is a premium electric sedan featuring advanced autopilot capabilities, 400+ mile range, and luxurious interior. This particular model includes the latest software updates and enhanced battery pack."
      },
      { 
        id: 2, 
        name: 'BMW M4',
        category: 'sports',
        price: 75000,
        images: [
          'https://images.unsplash.com/photo-1617814076367-b759c7d7e738',
          'https://images.unsplash.com/photo-1617814076367-180797a2c5fd',
          'https://images.unsplash.com/photo-1617814076367-180797a2c5fe'
        ],
        isNew: false,
        video: 'https://www.youtube.com/embed/MQvWQkU0c3M',
        seller: {
          name: "Sarah Johnson",
          experience: "10+ years",
          phone: "+1 (555) 234-5678",
          email: "sarah.j@example.com",
          location: "Miami, FL",
          description: "BMW certified dealer specializing in M series vehicles. Offering comprehensive vehicle inspections and test drives."
        },
        details: "The BMW M4 combines luxury with high performance, featuring a twin-turbo inline-6 engine, carbon fiber components, and advanced driving dynamics. This model includes the Competition Package."
      },
      { 
        id: 3, 
        name: 'Porsche 911',
        category: 'luxury',
        price: 120000,
        images: [
          'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e',
          'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1f',
          'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1g'
        ],
        isNew: true,
        video: 'https://www.youtube.com/embed/6gZGe_LL0kw',
        seller: {
          name: "Michael Chen",
          experience: "12+ years",
          phone: "+1 (555) 345-6789",
          email: "m.chen@example.com",
          location: "San Francisco, CA",
          description: "Porsche specialist with extensive knowledge of classic and modern models. Providing detailed documentation and service history."
        },
        details: "The Porsche 911 represents the pinnacle of sports car engineering, featuring rear-engine layout, precise handling, and iconic design. This model includes sport chrono package and premium audio system."
      }
    ],
    bikes: [
      { 
        id: 4, 
        name: 'Ducati Panigale',
        category: 'sport_bikes',
        price: 25000,
        images: [
          'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87',
          'https://images.unsplash.com/photo-1568772585407-9361f9bf3a88',
          'https://images.unsplash.com/photo-1568772585407-9361f9bf3a89'
        ],
        isNew: true,
        video: 'https://www.youtube.com/embed/ujwZRNLxCXs',
        seller: {
          name: "Marco Rossi",
          experience: "8+ years",
          phone: "+1 (555) 456-7890",
          email: "m.rossi@example.com",
          location: "Chicago, IL",
          description: "Ducati certified technician specializing in high-performance motorcycles. Offering detailed maintenance history and performance upgrades."
        },
        details: "The Ducati Panigale is a premium sports bike featuring advanced electronics, powerful engine, and track-ready components. This model includes the racing package and quick-shifter."
      },
      { 
        id: 5, 
        name: 'Harley Davidson',
        category: 'cruiser',
        price: 30000,
        images: [
          'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
          'https://images.unsplash.com/photo-1558981806-ec527fa84c3a',
          'https://images.unsplash.com/photo-1558981806-ec527fa84c3b'
        ],
        isNew: false,
        video: 'https://www.youtube.com/embed/PIyVU2gFtpY',
        seller: {
          name: "Robert Wilson",
          experience: "20+ years",
          phone: "+1 (555) 567-8901",
          email: "r.wilson@example.com",
          location: "Austin, TX",
          description: "Harley-Davidson expert with decades of experience. Specializing in custom builds and classic restorations."
        },
        details: "This Harley Davidson combines classic styling with modern technology, featuring a powerful V-twin engine and premium audio system. Includes touring package and custom exhaust."
      },
      { 
        id: 6, 
        name: 'BMW S1000RR',
        category: 'sport_bikes',
        price: 20000,
        images: [
          'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838',
          'https://images.unsplash.com/photo-1599819811279-d5ad9cccf839',
          'https://images.unsplash.com/photo-1599819811279-d5ad9cccf840'
        ],
        isNew: true,
        video: 'https://www.youtube.com/embed/3R3J1FpjWcE',
        seller: {
          name: "Lisa Zhang",
          experience: "7+ years",
          phone: "+1 (555) 678-9012",
          email: "l.zhang@example.com",
          location: "Seattle, WA",
          description: "BMW Motorrad specialist focusing on sport bikes. Providing comprehensive vehicle history and performance testing."
        },
        details: "The BMW S1000RR is a cutting-edge sports bike featuring advanced electronics, powerful inline-4 engine, and track-focused design. This model includes the M package and carbon fiber wheels."
      }
    ]
  };