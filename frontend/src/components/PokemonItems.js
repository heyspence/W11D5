import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import * as itemsAPI from "../store/items";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


const PokemonItems = ({ pokemon, setEditItemId }) => {
  const dispatch = useDispatch();
  
  const { pokemonId } = useParams();
  
  useEffect(() => {
    dispatch(itemsAPI.getPokemonItems(pokemonId))
  }, [])
  
  const items = useSelector((state) => {
    if (!pokemon.items) return null;
    return pokemon.items.map(itemId => state.items[itemId]);
  });

  if (!items) {
    return null;
  }

  return items.map((item) => (
    <tr key={item.id}>
      <td>
        <img
          className="item-image"
          alt={item.imageUrl}
          src={`${item.imageUrl}`}
        />
      </td>
      <td>{item.name}</td>
      <td className="centered">{item.happiness}</td>
      <td className="centered">${item.price}</td>
      {pokemon.captured && (
        <td className="centered">
          <button onClick={() => setEditItemId(item.id)}>
            Edit
          </button>
        </td>
      )}
      {pokemon.captured && (
        <td className="centered">
          <button>
            Delete
          </button>
        </td>
        
      )}
    </tr>
  ));
};

export default PokemonItems;