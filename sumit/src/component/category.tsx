export const categories = {
    midrange: "Mid-Range Cars",
    auto: "Auto Rickshaws",
    cruiser: "Cruiser Bikes",
    sport_bikes: "Sport Bikes",
    commuter: "Commuter Bikes"
  };
  
  // Vehicle data
  export const vehicles = {
    cars: [
      { 
        id: 1, 
        name: 'Toyota Camry',
        category: 'midrange',
        price: 35000,
        images: [
          'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb',
          'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fc',
          'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd'
        ],
        isNew: true,
        video: 'https://www.youtube.com/embed/dXxKNyYZVuU',
        seller: {
          name: "John Smith",
          experience: "10+ years",
          phone: "+1 (555) 123-4567",
          email: "john.smith@example.com",
          location: "Los Angeles, CA",
          description: "Certified Toyota specialist with extensive experience. Providing detailed vehicle history and maintenance records."
        },
        details: "The Toyota Camry is a reliable mid-size sedan featuring excellent fuel efficiency, comfortable interior, and advanced safety features. This model includes the latest entertainment system and driver assistance package."
      },
      { 
        id: 2, 
        name: 'Honda City',
        category: 'midrange',
        price: 25000,
        images: [
          'https://images.unsplash.com/photo-1609917141461-11dee4f47f76',
          'https://images.unsplash.com/photo-1609917141461-11dee4f47f77',
          'https://images.unsplash.com/photo-1609917141461-11dee4f47f78'
        ],
        isNew: false,
        video: 'https://www.youtube.com/embed/7d3Zvd6jIws',
        seller: {
          name: "Sarah Johnson",
          experience: "8+ years",
          phone: "+1 (555) 234-5678",
          email: "sarah.j@example.com",
          location: "Miami, FL",
          description: "Honda certified dealer specializing in city cars. Offering comprehensive vehicle inspections and test drives."
        },
        details: "The Honda City combines efficiency with comfort, featuring a responsive engine, spacious interior, and modern amenities. This model includes cruise control and premium audio system."
      },
      {
        id: 3,
        name: 'Bajaj RE Auto',
        category: 'auto',
        price: 5000,
        images: [
          'https://images.unsplash.com/photo-1623345805743-61bc90fa86da',
          'https://images.unsplash.com/photo-1623345805743-61bc90fa86db',
          'https://images.unsplash.com/photo-1623345805743-61bc90fa86dc'
        ],
        isNew: true,
        video: 'https://www.youtube.com/embed/Y2XUxaZEb8E',
        seller: {
          name: "Raj Patel",
          experience: "15+ years",
          phone: "+1 (555) 345-6789",
          email: "r.patel@example.com",
          location: "Chicago, IL",
          description: "Auto rickshaw specialist with extensive experience. Expert in maintenance and repairs."
        },
        details: "The Bajaj RE Auto is a reliable three-wheeler perfect for urban transportation. Features include CNG/LPG compatibility, comfortable seating, and excellent fuel efficiency."
      }
    ],
    bikes: [
      { 
        id: 4, 
        name: 'Royal Enfield Classic 350',
        category: 'cruiser',
        price: 4500,
        images: [
          'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f',
          'https://images.unsplash.com/photo-1591637333184-19aa84b3e01e',
          'https://images.unsplash.com/photo-1591637333184-19aa84b3e01d'
        ],
        isNew: true,
        video: 'https://www.youtube.com/embed/ujwZRNLxCXs',
        seller: {
          name: "Mike Ross",
          experience: "8+ years",
          phone: "+1 (555) 456-7890",
          email: "m.ross@example.com",
          location: "Austin, TX",
          description: "Royal Enfield specialist with expertise in classic motorcycles. Offering detailed maintenance history."
        },
        details: "The Royal Enfield Classic 350 offers a perfect blend of vintage styling and modern reliability. Features include fuel injection, disc brakes, and classic British styling."
      },
      { 
        id: 5, 
        name: 'Honda CBR 250R',
        category: 'sport_bikes',
        price: 4000,
        images: [
          'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87',
          'https://images.unsplash.com/photo-1568772585407-9361f9bf3a88',
          'https://images.unsplash.com/photo-1568772585407-9361f9bf3a89'
        ],
        isNew: false,
        video: 'https://www.youtube.com/embed/PIyVU2gFtpY',
        seller: {
          name: "Lisa Chen",
          experience: "6+ years",
          phone: "+1 (555) 567-8901",
          email: "l.chen@example.com",
          location: "Seattle, WA",
          description: "Honda certified technician specializing in sport bikes. Expert in performance tuning."
        },
        details: "The Honda CBR 250R is a perfect entry-level sports bike with reliable performance and comfortable ergonomics. Includes ABS and digital instrumentation."
      },
      { 
        id: 6, 
        name: 'Hero Splendor Plus',
        category: 'commuter',
        price: 1200,
        images: [
          'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838',
          'https://images.unsplash.com/photo-1599819811279-d5ad9cccf839',
          'https://images.unsplash.com/photo-1599819811279-d5ad9cccf840'
        ],
        isNew: true,
        video: 'https://www.youtube.com/embed/3R3J1FpjWcE',
        seller: {
          name: "Priya Kumar",
          experience: "7+ years",
          phone: "+1 (555) 678-9012",
          email: "p.kumar@example.com",
          location: "Houston, TX",
          description: "Commuter bike specialist with extensive experience in economical motorcycles."
        },
        details: "The Hero Splendor Plus is India's most popular commuter bike, known for its exceptional fuel efficiency and reliability. Features i3S technology and tubeless tires."
      }
    ]
  };