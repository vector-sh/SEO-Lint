import React from 'react';
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Premium Coffee Beans | Fresh Roasted Daily | Best Prices</title>
        <meta 
          name="description" 
          content="Order premium coffee beans roasted fresh daily. Free shipping on orders over $30. Discover our selection of single-origin and blend coffees from around the world." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://example.com/coffee-beans" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Premium Coffee Beans - Fresh Roasted" />
        <meta property="og:description" content="Order premium coffee beans roasted fresh daily" />
        <meta property="og:image" content="https://example.com/og-coffee.jpg" />
        <meta property="og:url" content="https://example.com/coffee-beans" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Premium Coffee Beans Collection",
            "image": "https://example.com/coffee-beans.jpg",
            "description": "Fresh roasted premium coffee beans",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "USD",
              "lowPrice": "15.99"
            }
          })}
        </script>
      </Head>
      
      <main>
        <h1>Premium Coffee Beans</h1>
        
        <p>
          Welcome to our collection of freshly roasted coffee beans. We source the finest 
          beans from sustainable farms around the world and roast them in small batches to 
          ensure maximum freshness and flavor. Whether you prefer light, medium, or dark 
          roasts, we have the perfect coffee for your taste.
        </p>

        <img 
          src="/coffee-beans.jpg" 
          alt="Freshly roasted coffee beans in a burlap sack on wooden table"
          width={800}
          height={600}
          loading="lazy"
        />

        <h2>Our Coffee Selection</h2>
        
        <p>
          Explore our curated selection of single-origin coffees and expertly crafted blends. 
          Each variety offers unique flavor profiles, from bright and fruity to rich and 
          chocolatey. All our beans are ethically sourced and fair trade certified.
        </p>

        <h3>Single-Origin Coffees</h3>
        <p>
          Experience the distinct characteristics of coffee from specific regions. Our 
          single-origin selections showcase the unique terroir and processing methods 
          of each coffee-growing region.
        </p>

        <h3>Signature Blends</h3>
        <p>
          Our master roasters have created exceptional blends that combine beans from 
          different origins to achieve perfect balance and complexity in every cup.
        </p>

        <img 
          src="/roasting-process.jpg" 
          alt="Coffee roasting machine processing fresh coffee beans"
          width={1200}
          height={800}
          loading="lazy"
          title="Our Coffee Roasting Process"
        />

        <h2>Why Choose Our Coffee</h2>
        
        <p>
          We're committed to quality at every step. From careful sourcing to precise 
          roasting and fast shipping, we ensure you receive the freshest, most flavorful 
          coffee possible. Join thousands of satisfied customers who trust us for their 
          daily coffee needs.
        </p>
      </main>
    </>
  );
}
