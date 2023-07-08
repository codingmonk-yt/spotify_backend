const { default: axios } = require("axios");
const catchAsync = require("../utils/catchAsync");

exports.getOne = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { episode_id } = req.params;
  const { market } = req.query;
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/episodes/${episode_id}`,
      {
        params: {
          market,
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

exports.getSeveral = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { ids } = req.query;

  try {
    const response = await axios.get("https://api.spotify.com/v1/episodes", {
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

exports.getSavedEpisodes = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { market, limit, offset } = req.query;

  try {
    const response = await axios.get("https://api.spotify.com/v1/me/episodes", {
      params: {
        market,
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

exports.saveEpisodes = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { ids } = req.query;

  try {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/episodes",
      {
        ids,
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

exports.removeSavedEpisodes = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { ids } = req.query;

  try {
    const response = await axios.delete(
      "https://api.spotify.com/v1/me/episodes",
      {
        data: {
          ids,
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

exports.checkMySavedEpisodes = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { ids } = req.query;

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/episodes/contains",
      {
        params: {
          ids,
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
