// FROM https://github.com/drewswaycool/react-cats
import React from 'react';

function Cat(props) {

  function handleLoad() {
    setTimeout(function(){ 
      $('#loader').fadeOut();
      setTimeout(function(){ $('#cat-img').fadeIn();}, 600);
    }, 1000);
    
  }

    const { type = '',
            text = '%20',
            fontSize = '50',
            color = 'white',
            filter = '',
            width = '',
            height = ''
          } = props;
  
    const uniqueNum = Math.random();
    const url = `https://cataas.com/cat/${type}/says/${text}?s=${fontSize}&c=${color}&filter=${filter}&width=${width}&height=${height}&uniqueNum=${uniqueNum}`;

  
    return (
      <img id="cat-img" src={url} onLoad={handleLoad()} />
    )
  
  }
  
  export default Cat