import React, { useState } from 'react';

import { TextField, Button, LinearProgress } from '@material-ui/core';

import shrtcode from '../api/shrtcode';

const HTTP_URL_VALIDATOR_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const Search = () => {
  const [link, setlink] = useState('');

  const [short, setShort] = useState('');

  const [msgerro, setMsgerro] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const validadeURL = (stringURL) => {
    return stringURL.match(HTTP_URL_VALIDATOR_REGEX);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) {
      if (validadeURL(link)) {
        setMsgerro('');
        getLink();
        setlink('');
        setIsLoading(!isLoading);
      } else {
        setMsgerro('Coloque uma URL válida');
      }
    }
  };

  const getLink = async () => {
    await shrtcode
      .get(`shorten?url=${link}`)
      .then((response) => {
        setShort(response.data.result.short_link);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getClickableLink = (link) => {
    return link.startsWith('http://') || link.startsWith('https://')
      ? link
      : `http://${link}`;
  };

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <TextField
          style={{ marginBottom: '20px' }}
          label="Insira o link"
          variant="outlined"
          value={link}
          onChange={(e) => setlink(e.target.value)}
        ></TextField>
        {!isLoading && (
          <Button
            style={{ marginBottom: '20px' }}
            onClick={(e) => handleSubmit(e)}
            variant="contained"
            color="primary"
          >
            Enviar
          </Button>
        )}

        {isLoading && <LinearProgress></LinearProgress>}
      </form>

      {short && (
        <div>
          URL encurtada:{' '}
          <a href={getClickableLink(short)} target="_blank" rel="noreferrer">
            {short}
          </a>
        </div>
      )}

      {msgerro && <div>{msgerro}</div>}
    </>
  );
};

export default Search;
