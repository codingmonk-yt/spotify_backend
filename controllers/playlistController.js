const { default: axios } = require("axios");
const catchAsync = require("../utils/catchAsync");

exports.getPlaylist = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { playlist_id } = req.params;
  const { market } = req.query;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlist_id}`,
      {
        params: {
          market: market,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.updatePlaylistDetails = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { playlist_id } = req.params;
  const { name, description, public } = req.body;
  try {
    const response = await axios.put(
      `https://api.spotify.com/v1/playlists/${playlist_id}`,
      {
        name: name,
        description: description,
        public: public,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.getPlaylistItems = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { playlist_id } = req.params;
  const { market, limit, offset } = req.query;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        params: {
          market: market,
          limit: limit,
          offset: offset,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.addItemToPlaylist = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { playlist_id } = req.params;
  const { uris, position } = req.body;

  try {
    const response = await axios.post(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        uris: uris,
        position: position,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.removePlaylistItems = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { playlist_id } = req.params;
  const { tracks, snapshot_id } = req.body;

  try {
    const response = await axios.delete(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        data: {
          tracks: tracks,
          snapshot_id: snapshot_id,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.getMyPlaylists = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { limit, offset } = req.query;

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        params: {
          limit: limit,
          offset: offset,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.getUsersPlaylists = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { user_id } = req.params;
  const { limit, offset } = req.query;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/users/${user_id}/playlists`,
      {
        params: {
          limit: limit,
          offset: offset,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.createPlaylist = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { user_id } = req.params;
  const { name, description, public } = req.body;
  try {
    const response = await axios.post(
      `https://api.spotify.com/v1/users/${user_id}/playlists`,
      {
        name,
        description,
        public,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.getFeaturedPlaylists = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { country, limit, offset } = req.query;

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/browse/featured-playlists",
      {
        params: {
          country: country,
          limit: limit,
          offset: offset,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.getCategoriesPlaylists = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { category_id } = req.params;
  const { country, limit, offset } = req.query;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/browse/categories/${category_id}/playlists`,
      {
        params: {
          country: country,
          limit: limit,
          offset: offset,
        },
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.getPlaylistCoverImage = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { playlist_id } = req.params;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlist_id}/images`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.addCustomPlaylistCoverImage = catchAsync(async (req, res, next) => {
  const { playlist_id } = req.params;
  const { imageData } = req.body;

  try {
    const response = await axios.put(
      `https://api.spotify.com/v1/playlists/${playlist_id}/images`,
      imageData,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "image/jpeg",
        },
      }
    );

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});
