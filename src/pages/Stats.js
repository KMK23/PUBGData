import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const Stats = () => {
  const [platform, setPlatform] = useState("kakao");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!nickname) {
      setError("닉네임을 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // account ID를 직접 사용
      const playerId = "account.ee70437bcbc04f198532f0920b47707f";

      const statsResponse = await fetch(
        `https://api.pubg.com/shards/${platform}/players/${playerId}/seasons/lifetime?filter[gamepad]=false`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PUBG_API_KEY}`,
            Accept: "application/vnd.api+json",
          },
        }
      );

      if (!statsResponse.ok) {
        throw new Error("통계 데이터를 가져올 수 없습니다.");
      }

      const statsData = await statsResponse.json();
      setStats(statsData.data.attributes.gameModeStats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("ko-KR").format(num);
  };

  const renderStats = (mode) => {
    if (!stats || !stats[mode]) return null;

    const modeStats = stats[mode];
    const modeName = {
      solo: "솔로",
      duo: "듀오",
      squad: "스쿼드",
    }[mode];

    return (
      <Grid item xs={12} md={4} key={mode}>
        <Paper
          sx={{
            p: 3,
            height: "100%",
            background: "linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            borderRadius: "12px",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: "#90caf9", mb: 3, textAlign: "center" }}
          >
            {modeName} 통계
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography color="text.secondary">승률</Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {((modeStats.wins / modeStats.roundsPlayed) * 100).toFixed(1)}%
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color="text.secondary">K/D</Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {(
                  modeStats.kills /
                  (modeStats.roundsPlayed - modeStats.wins)
                ).toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color="text.secondary">평균 데미지</Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {(modeStats.damageDealt / modeStats.roundsPlayed).toFixed(1)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color="text.secondary">헤드샷 비율</Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {((modeStats.headshotKills / modeStats.kills) * 100).toFixed(1)}
                %
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color="text.secondary">최장 킬</Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.longestKill.toFixed(1)}m
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color="text.secondary">최장 생존</Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {(modeStats.longestTimeSurvived / 60).toFixed(1)}분
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="text.secondary">총 게임 수</Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {formatNumber(modeStats.roundsPlayed)}게임
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="text.secondary">총 승리</Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {formatNumber(modeStats.wins)}승
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography color="text.secondary">총 킬</Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {formatNumber(modeStats.kills)}킬
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#121212", py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ color: "#90caf9", mb: 6, textAlign: "center" }}
        >
          전체 통계 확인
        </Typography>

        {/* 검색 섹션 */}
        <Paper
          sx={{
            p: 3,
            mb: 6,
            background: "linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            borderRadius: "12px",
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: "#90caf9" }}>플랫폼</InputLabel>
                <Select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  label="플랫폼"
                  sx={{
                    color: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#90caf9",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#90caf9",
                    },
                  }}
                >
                  <MenuItem value="kakao">카카오</MenuItem>
                  <MenuItem value="steam">스팀</MenuItem>
                  <MenuItem value="console">콘솔</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": {
                      borderColor: "#90caf9",
                    },
                    "&:hover fieldset": {
                      borderColor: "#90caf9",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#90caf9",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSearch}
                disabled={loading}
                startIcon={
                  loading ? <CircularProgress size={20} /> : <SearchIcon />
                }
              >
                검색
              </Button>
            </Grid>
          </Grid>
          {error && (
            <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
              {error}
            </Typography>
          )}
        </Paper>

        {/* 통계 표시 */}
        {stats && (
          <Grid container spacing={3}>
            {renderStats("solo")}
            {renderStats("duo")}
            {renderStats("squad")}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Stats;
