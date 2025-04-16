const Products = () => {
    const dummyProducts = [
      { id: 1, name: "Macbook Pro", price: "$25", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqfapnDEBg7qijQNEBJu171EGbZ0g03YTPaw&s" },
      { id: 2, name: "Samsung s23 ultra", price: "$15", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfymMadQ2Y8LyRDJxcI-15HMH4Auk2tLBGJw&s" },
      { id: 3, name: "Rog zephyrus g16", price: "$20", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtG7vsdmSVbe6_wQQEdzdYBLje5I5fc2WBCQ&s" },
    ];
  
    return (
        <div>
          <h2 className="text-2xl font-bold mb-4">Product List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {dummyProducts.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-xl/20">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
                <div className="mt-4 flex space-x-2">
                  <button className="bg-black hover:opacity-50 text-white px-3 py-1 rounded text-sm  w-1/2 mr-1">Add to Cart</button>
                  <button className="bg-gray-500 hover:opacity-50 text-white px-3 py-1 rounded text-sm  w-1/2 mr-1">Buy Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  };
  
  export default Products;