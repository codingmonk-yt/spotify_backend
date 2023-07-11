const { default: axios } = require("axios");
const catchAsync = require("../utils/catchAsync");

exports.getShow = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { show_id } = req.params;
  const { market } = req.query;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/shows/${show_id}?market=${market}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response data
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json(error.response.data.error);
  }
});

exports.getSeveralShows = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { market, ids } = req.query;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/shows?market=${market}&ids=${ids}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response data
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json(error.response.data.error);
  }
});

exports.getShowEpisodes = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { show_id } = req.params;
  const { market, limit, offset } = req.query;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/shows/${show_id}/episodes?market=${market}&limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response data
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json(error.response.data.error);
  }
});

exports.getSavedShows = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { limit, offset } = req.query;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/shows?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response data
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json(error.response.data.error);
  }
});

exports.saveShows = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { ids } = req.query;
  try {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/shows?ids=${ids}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the response data
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json(error.response.data.error);
  }
});

exports.removeSavedShows = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { ids, market } = req.query;
  try {
    const response = await axios.delete(
      `https://api.spotify.com/v1/me/shows?ids=${ids}&market=${market}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the response data
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json(error.response.data.error);
  }
});

exports.checkSavedShows = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { ids } = req.query;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/shows/contains?ids=${ids}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // Handle the response data
    res.json(response.data);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json(error.response.data.error);
  }
});
