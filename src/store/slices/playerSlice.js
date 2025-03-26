import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.REACT_APP_PUBG_API_KEY;
const BASE_URL = "https://api.pubg.com/shards";

// 현재 시즌 정보를 가져오는 함수
const getCurrentSeason = async (platform) => {
  try {
    const response = await axios.get(`${BASE_URL}/${platform}/seasons`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/vnd.api+json",
      },
    });

    const seasons = response.data.data;
    // 현재 시즌 찾기
    const currentSeason = seasons.find(
      (season) => season.attributes.isCurrentSeason
    );
    // 오프시즌 찾기
    const offSeason = seasons.find((season) => season.attributes.isOffseason);

    if (currentSeason) {
      return currentSeason.id;
    } else if (offSeason) {
      return offSeason.id;
    } else if (seasons.length > 0) {
      // 현재 시즌이나 오프시즌을 찾지 못한 경우 가장 최근 시즌 반환
      return seasons[0].id;
    }

    // 카카오 플랫폼의 경우 기본 시즌 ID 반환
    if (platform === "kakao") {
      return "division.bro.official.2024-01";
    }

    throw new Error("현재 시즌 정보를 찾을 수 없습니다.");
  } catch (error) {
    console.error("시즌 정보 조회 실패:", error);
    if (platform === "kakao") {
      return "division.bro.official.2024-01";
    }
    throw new Error("현재 시즌 정보를 가져올 수 없습니다.");
  }
};

// 플레이어 정보를 가져오는 비동기 액션
export const fetchPlayerData = createAsyncThunk(
  "player/fetchPlayerData",
  async ({ nickname, platform }, { rejectWithValue }) => {
    try {
      // 1. 플레이어 검색하여 accountId 얻기
      const playerResponse = await axios.get(
        `${BASE_URL}/${platform}/players?filter[playerNames]=${nickname}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: "application/vnd.api+json",
          },
        }
      );

      if (!playerResponse.data.data || playerResponse.data.data.length === 0) {
        throw new Error("플레이어를 찾을 수 없습니다.");
      }

      const playerId = playerResponse.data.data[0].id;
      console.log("플레이어 정보:", {
        nickname: playerResponse.data.data[0].attributes.name,
        accountId: playerId,
        platform: platform,
      });

      // 2. 현재 시즌 정보 가져오기
      const seasonsResponse = await axios.get(
        `${BASE_URL}/${platform}/seasons`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: "application/vnd.api+json",
          },
        }
      );

      const currentSeason = seasonsResponse.data.data.find(
        (season) => season.attributes.isCurrentSeason
      );

      if (!currentSeason) {
        throw new Error("현재 시즌 정보를 가져올 수 없습니다.");
      }

      const seasonId = currentSeason.id;
      console.log("시즌 정보:", {
        seasonId: seasonId,
        seasonName: currentSeason.attributes.name,
        isCurrentSeason: currentSeason.attributes.isCurrentSeason,
        isOffseason: currentSeason.attributes.isOffseason,
      });

      // 3. 플레이어의 시즌 통계 가져오기
      const statsResponse = await axios.get(
        `${BASE_URL}/${platform}/players/${playerId}/seasons/${seasonId}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: "application/vnd.api+json",
          },
        }
      );

      // 4. 랭크 통계 가져오기
      const rankedResponse = await axios.get(
        `${BASE_URL}/${platform}/players/${playerId}/seasons/${seasonId}/ranked`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: "application/vnd.api+json",
          },
        }
      );

      return {
        player: playerResponse.data.data[0],
        stats: statsResponse.data.data,
        ranked: rankedResponse.data.data,
      };
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.errors[0].detail);
      }
      return rejectWithValue(error.message);
    }
  }
);

// 현재 시즌 정보 가져오기
export const fetchCurrentSeason = createAsyncThunk(
  "player/fetchCurrentSeason",
  async ({ platform }) => {
    const response = await axios.get(`${BASE_URL}/${platform}/seasons`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/vnd.api+json",
      },
    });
    return response.data;
  }
);

// 리더보드 데이터 가져오기
export const fetchLeaderboard = createAsyncThunk(
  "player/fetchLeaderboard",
  async ({ platform, gameMode }) => {
    // 플랫폼에 따른 shard 설정
    const adjustedPlatform = platform === "kakao" ? "pc-kakao" : platform;

    try {
      // 먼저 현재 시즌 정보를 가져옵니다
      const seasonsResponse = await axios.get(
        `${BASE_URL}/${adjustedPlatform}/seasons`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: "application/vnd.api+json",
          },
        }
      );

      // 현재 시즌 찾기
      const currentSeason = seasonsResponse.data.data.find(
        (season) => season.attributes.isCurrentSeason
      );

      if (!currentSeason) {
        throw new Error("현재 시즌 정보를 찾을 수 없습니다.");
      }

      // 현재 시즌의 리더보드 가져오기
      const response = await axios.get(
        `${BASE_URL}/${adjustedPlatform}/leaderboards/${currentSeason.id}/${gameMode}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: "application/vnd.api+json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 429) {
        throw new Error(
          "API 요청 제한에 도달했습니다. 잠시 후 다시 시도해주세요."
        );
      }
      if (error.response?.status === 400) {
        throw new Error(
          "잘못된 요청입니다. 시즌 ID나 게임 모드를 확인해주세요."
        );
      }
      throw error;
    }
  }
);

const initialState = {
  platform: "kakao",
  loading: false,
  error: null,
  data: null,
  currentSeason: null,
  leaderboard: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlatform: (state, action) => {
      state.platform = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 플레이어 데이터 가져오기
      .addCase(fetchPlayerData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayerData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPlayerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // 현재 시즌 정보 가져오기
      .addCase(fetchCurrentSeason.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentSeason.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSeason = action.payload;
      })
      .addCase(fetchCurrentSeason.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // 리더보드 데이터 가져오기
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboard = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPlatform } = playerSlice.actions;
export default playerSlice.reducer;
