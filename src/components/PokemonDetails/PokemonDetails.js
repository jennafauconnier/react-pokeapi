import React from 'react';
import './PokemonDetails.css'

const PokemonDetails = ({id, name, image, type}) => {


    const style = `thumb-container ${type}`

    return (
        <button className={style} onClick={() => console.log('PokemonDetails', {id, name, image, type})}>
            <img className="img-container" src={image} alt={name} />
            <div className="number">
                <h2>{id}</h2>
            </div>
            <div className="detail-wrapper">
                <h3>{name}</h3>
                <h4>{type}</h4>
            </div>
            
        </button>
    )
}

export default PokemonDetails;