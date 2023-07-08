const { default: axios } = require("axios");
const catchAsync = require("../utils/catchAsync");

exports.getOne = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { market } = req.query;
  const { audiobook_id } = req.params;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/audiobooks/${audiobook_id}`,
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
  const { market, ids } = req.query;
  try {
    const response = await axios.get("https://api.spotify.com/v1/audiobooks", {
      params: {
        ids,
        market,
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

exports.audiobookChapters = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { market, limit, offset } = req.query;
  const { audiobook_id } = req.params;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/audiobooks/${audiobook_id}/chapters`,
      {
        params: {
          market,
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

exports.getMySavedAudiobooks = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { limit, offset } = req.query;

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/audiobooks",
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

exports.saveAudiobooks = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { ids } = req.params;

  try {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/audiobooks",
      {
        ids,
      },
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

exports.removeSavedAudiobooks = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { ids } = req.params;

  try {
    const response = await axios.delete(
      "https://api.spotify.com/v1/me/audiobooks",
      {
        data: {
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

exports.checkSavedAudiobooks = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { ids } = req.params;

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/audiobooks/contains",
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
