const { default: axios } = require("axios");
const catchAsync = require("../utils/catchAsync");

exports.getAlbum = catchAsync(async (req, res, next) => {
  const { id, access_token } = req;
  const { album_id } = req.params;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${album_id}`,
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

exports.getAlbums = catchAsync(async (req, res, next) => {
  const { id, access_token } = req;
  const { ids } = req.params;

  try {
    const response = await axios.get("https://api.spotify.com/v1/albums", {
      params: {
        ids,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.getTracksByAlbum = catchAsync(async (req, res, next) => {
  const { id, access_token } = req;
  const { album_id, limit, offset } = req.params;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${album_id}/tracks`,
      {
        params: {
          limit,
          offset,
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

exports.getMySavedAlbums = catchAsync(async (req, res, next) => {
  const { id, access_token } = req;
  const { limit, offset } = req.params;

  try {
    const response = await axios.get("https://api.spotify.com/v1/me/albums", {
      params: {
        limit,
        offset,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    res.status(500).json(error.response.data.error);
  }
});

exports.saveAlbum = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { id } = req.params;

  try {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/albums?ids=${id}`,
      {
        ids: [id],
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

exports.removeAlbum = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { id } = req.params;

  try {
    const response = await axios.delete(
      `https://api.spotify.com/v1/me/albums?ids=${id}`,
      {
        data: {
          ids: id,
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

exports.checkSavedAlbum = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { id } = req.params;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/albums/contains?ids=${id}`,
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

exports.getNewReleases = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { limit, offset, country } = req.params;

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases",
      {
        params: {
          limit,
          offset,
          country,
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
