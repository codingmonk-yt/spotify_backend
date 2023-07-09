const { default: axios } = require("axios");
const catchAsync = require("../utils/catchAsync");

exports.getPlaybackState = catchAsync(async (req, res, next) => {
  const { access_token } = req;

  try {
    const response = await axios.get("https://api.spotify.com/v1/me/player", {
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

exports.transferPlayback = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { device_id } = req.params;

  try {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player",
      {
        device_ids: [device_id],
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

exports.getAvailableDevices = catchAsync(async (req, res, next) => {
  const { access_token } = req;

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/devices",
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

exports.getCurrentlyPlayingTrack = catchAsync(async (req, res, next) => {
  const { access_token } = req;

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
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

exports.startResumePlayback = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { contextUri, position, positionMs, uri } = req.query;
  try {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player/play",
      {
        uri: [uri],
        context_uri: contextUri,
        offset: {
          position: position,
        },
        position_ms: positionMs,
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

exports.pausePlayback = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  try {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player/pause",
      null,
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

exports.skipToNext = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  try {
    const response = await axios.post(
      "https://api.spotify.com/v1/me/player/next",
      null,
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

exports.skipToPrevious = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  try {
    const response = await axios.post(
      "https://api.spotify.com/v1/me/player/previous",
      null,
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

exports.seekToPosition = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { positionMs } = req.params;
  try {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player/seek",
      null,
      {
        params: {
          position_ms: positionMs,
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

exports.setRepeatMode = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { state } = req.params;
  try {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player/repeat",
      null,
      {
        params: {
          state: state,
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

exports.setPlaybackVolume = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { volumePercent } = req.params;
  try {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      null,
      {
        params: {
          volume_percent: volumePercent,
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

exports.togglePlaybackShuffle = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { state } = req.params;
  try {
    const response = await axios.put(
      "https://api.spotify.com/v1/me/player/shuffle",
      null,
      {
        params: {
          state: state,
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

exports.getRecentlyPlayed = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played",
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

exports.getQueue = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/queue",
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

exports.addToQueue = catchAsync(async (req, res, next) => {
  const { access_token } = req;
  const { uri } = req.params;
  try {
    const response = await axios.post(
      "https://api.spotify.com/v1/me/player/queue",
      null,
      {
        params: {
          uri: uri,
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
