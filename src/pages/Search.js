import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayerData, setPlatform } from "../store/slices/playerSlice";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Divider,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  TrendingUp,
  SportsEsports,
  NewReleases,
  CompareArrows,
  LiveTv,
  AccessTime,
  EmojiEvents,
  Speed,
  Person,
  Group,
} from "@mui/icons-material";

const StatsCard = ({ stats, title }) => {
  const [selectedMode, setSelectedMode] = useState("squad");

  // KDA 계산 함수
  const calculateKDA = (stats) => {
    if (!stats) return 0;
    const kills = stats.kills || 0;
    const deaths = stats.losses || 0;
    const assists = stats.assists || 0;

    if (deaths === 0) return kills + assists;
    return ((kills + assists) / deaths).toFixed(2);
  };

  // KD 계산 함수
  const calculateKD = (stats) => {
    if (!stats) return 0;
    const kills = stats.kills || 0;
    const deaths = stats.losses || 0;

    if (deaths === 0) return kills;
    return (kills / deaths).toFixed(2);
  };

  // 승률 계산 함수
  const calculateWinRate = (stats) => {
    if (!stats) return 0;
    const wins = stats.wins || 0;
    const roundsPlayed = stats.roundsPlayed || 0;

    if (roundsPlayed === 0) return 0;
    return ((wins / roundsPlayed) * 100).toFixed(1);
  };

  // 평균 데미지 계산 함수
  const calculateAvgDamage = (stats) => {
    if (!stats) return 0;
    const damageDealt = stats.damageDealt || 0;
    const roundsPlayed = stats.roundsPlayed || 0;

    if (roundsPlayed === 0) return 0;
    return Math.round(damageDealt / roundsPlayed);
  };

  if (!stats || !stats.attributes) return null;

  const attributes = stats.attributes;
  const gameModeStats = attributes.gameModeStats || {};

  // 사용 가능한 게임 모드 목록
  const availableModes = Object.keys(gameModeStats).filter(
    (mode) => gameModeStats[mode].roundsPlayed > 0
  );

  const modeStats = gameModeStats[selectedMode] || {};

  const kda = calculateKDA(modeStats);
  const kd = calculateKD(modeStats);
  const winRate = calculateWinRate(modeStats);
  const avgDamage = calculateAvgDamage(modeStats);
  const headshotRate =
    modeStats.headshotKills && modeStats.kills
      ? ((modeStats.headshotKills / modeStats.kills) * 100).toFixed(1)
      : 0;

  // 시간 포맷팅 함수
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}시간 ${minutes}분 ${remainingSeconds}초`;
    } else if (minutes > 0) {
      return `${minutes}분 ${remainingSeconds}초`;
    }
    return `${remainingSeconds}초`;
  };

  // 거리 포맷팅 함수
  const formatDistance = (meters) => {
    const km = Math.floor(meters / 1000);
    const remainingMeters = Math.floor(meters % 1000);
    return `${km}km ${remainingMeters}m`;
  };

  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        background: "linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        borderRadius: "12px",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: "#90caf9",
          fontWeight: "bold",
          textAlign: "center",
          mb: 3,
        }}
      >
        {title}
      </Typography>

      {/* 게임 모드 선택 */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "center", gap: 2 }}>
        {availableModes.map((mode) => (
          <Button
            key={mode}
            variant={selectedMode === mode ? "contained" : "outlined"}
            onClick={() => setSelectedMode(mode)}
            sx={{
              color: selectedMode === mode ? "#fff" : "#90caf9",
              borderColor: "#90caf9",
              "&:hover": {
                borderColor: "#90caf9",
                backgroundColor: "rgba(144, 202, 249, 0.1)",
              },
            }}
          >
            {mode === "solo"
              ? "솔로"
              : mode === "duo"
              ? "듀오"
              : mode === "squad"
              ? "스쿼드"
              : mode === "solo-fpp"
              ? "솔로 FPP"
              : mode === "duo-fpp"
              ? "듀오 FPP"
              : mode === "squad-fpp"
              ? "스쿼드 FPP"
              : mode}
          </Button>
        ))}
      </Box>

      {/* 게임 통계 */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            color: "#f48fb1",
            fontWeight: "bold",
            borderBottom: "2px solid #f48fb1",
            pb: 1,
            mb: 2,
          }}
        >
          게임
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                게임 수
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.roundsPlayed || 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                승리
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.wins || 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                승률
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {winRate}%
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                탑10
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.top10s || 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                탑10률
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.roundsPlayed > 0
                  ? ((modeStats.top10s / modeStats.roundsPlayed) * 100).toFixed(
                      1
                    )
                  : "0.0"}
                %
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* 전투 통계 */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            color: "#f48fb1",
            fontWeight: "bold",
            borderBottom: "2px solid #f48fb1",
            pb: 1,
            mb: 2,
          }}
        >
          전투
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                KDA
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {kda}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                (K+A/D)
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                K/D
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {kd}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                (K/D)
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                평균 데미지
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {avgDamage}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                킬
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.kills || 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                어시스트
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.assists || 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                데스
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.losses || 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                헤드샷
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.headshotKills || 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                헤드샷 비율
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {headshotRate}%
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                최장 킬 거리
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.longestKill || 0}m
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                최대 연속 킬
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.maxKillStreaks || 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                최대 킬
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.roundMostKills || 0}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* 팀 관련 통계 */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            color: "#f48fb1",
            fontWeight: "bold",
            borderBottom: "2px solid #f48fb1",
            pb: 1,
            mb: 2,
          }}
        >
          팀 관련
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                팀원 살림
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.revives || 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                로드킬
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.roadKills || 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                자살
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.suicides || 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                팀킬
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.teamKills || 0}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* 생존 통계 */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            color: "#f48fb1",
            fontWeight: "bold",
            borderBottom: "2px solid #f48fb1",
            pb: 1,
            mb: 2,
          }}
        >
          생존
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                총 생존 시간
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {formatTime(modeStats.timeSurvived || 0)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                가장 오래 생존
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {formatTime(modeStats.longestTimeSurvived || 0)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* 아이템 사용 통계 */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            color: "#f48fb1",
            fontWeight: "bold",
            borderBottom: "2px solid #f48fb1",
            pb: 1,
            mb: 2,
          }}
        >
          아이템 사용
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                치유
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.heals || 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                부스트
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.boosts || 0}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                습득 무기
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {modeStats.weaponsAcquired || 0}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* 이동 거리 통계 */}
      <Box>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            color: "#f48fb1",
            fontWeight: "bold",
            borderBottom: "2px solid #f48fb1",
            pb: 1,
            mb: 2,
          }}
        >
          이동 거리
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                걷기
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {formatDistance(modeStats.walkDistance || 0)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                탈것
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {formatDistance(modeStats.rideDistance || 0)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                background: "rgba(144, 202, 249, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                수영
              </Typography>
              <Typography variant="h6" sx={{ color: "#90caf9" }}>
                {formatDistance(modeStats.swimDistance || 0)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

const ServerStatus = () => {
  const [status, setStatus] = useState("online");
  const [players, setPlayers] = useState(0);

  return (
    <Paper
      sx={{
        p: 2,
        mb: 3,
        background: "linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        borderRadius: "12px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <SportsEsports sx={{ color: "#90caf9", mr: 1 }} />
        <Typography variant="h6" sx={{ color: "#90caf9" }}>
          서버 상태
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Chip
          label={status === "online" ? "온라인" : "오프라인"}
          color={status === "online" ? "success" : "error"}
          size="small"
        />
        <Typography variant="body2" color="text.secondary">
          현재 접속자: {players.toLocaleString()}명
        </Typography>
      </Box>
    </Paper>
  );
};

const RecentNews = () => {
  const news = [
    {
      title: "신규 시즌 업데이트",
      date: "2024-03-15",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "신규 무기 추가",
      date: "2024-03-10",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <Paper
      sx={{
        p: 2,
        mb: 3,
        background: "linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        borderRadius: "12px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <NewReleases sx={{ color: "#90caf9", mr: 1 }} />
        <Typography variant="h6" sx={{ color: "#90caf9" }}>
          최신 소식
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {news.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card sx={{ bgcolor: "rgba(144, 202, 249, 0.1)" }}>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="subtitle1" sx={{ color: "#fff" }}>
                  {item.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

const PopularPlayers = () => {
  const players = [
    {
      name: "TGLTN",
      rank: 1,
      kd: "4.2",
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Kaymind",
      rank: 2,
      kd: "3.8",
      image: "https://via.placeholder.com/50",
    },
  ];

  return (
    <Paper
      sx={{
        p: 2,
        mb: 3,
        background: "linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        borderRadius: "12px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <TrendingUp sx={{ color: "#90caf9", mr: 1 }} />
        <Typography variant="h6" sx={{ color: "#90caf9" }}>
          인기 선수
        </Typography>
      </Box>
      <List>
        {players.map((player, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar src={player.image} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="subtitle1" sx={{ color: "#fff" }}>
                    {player.name}
                  </Typography>
                  <Chip
                    label={`#${player.rank}`}
                    size="small"
                    color="primary"
                  />
                </Box>
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                  K/D: {player.kd}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

const Search = () => {
  const [nickname, setNickname] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();
  const { loading, error, data, platform } = useSelector(
    (state) => state.player
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (nickname.trim()) {
      dispatch(fetchPlayerData({ nickname, platform }));
    }
  };

  const handlePlatformChange = (event) => {
    dispatch(setPlatform(event.target.value));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderGameModeStats = () => {
    if (!data || !data.stats) return null;

    const stats = data.stats;
    const gameModes = {
      solo: stats.attributes.gameModeStats.solo,
      duo: stats.attributes.gameModeStats.duo,
      squad: stats.attributes.gameModeStats.squad,
      "solo-fpp": stats.attributes.gameModeStats["solo-fpp"],
      "duo-fpp": stats.attributes.gameModeStats["duo-fpp"],
      "squad-fpp": stats.attributes.gameModeStats["squad-fpp"],
    };

    const modeLabels = {
      solo: "솔로",
      duo: "듀오",
      squad: "스쿼드",
      "solo-fpp": "솔로 FPP",
      "duo-fpp": "듀오 FPP",
      "squad-fpp": "스쿼드 FPP",
    };

    // 플랫폼에 따라 사용 가능한 모드만 필터링
    const availableModes =
      platform === "kakao"
        ? ["solo", "duo", "squad"]
        : ["solo", "duo", "squad", "solo-fpp", "duo-fpp", "squad-fpp"];

    return (
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
        >
          <Tab label="랭크" />
          {availableModes.map((mode, index) => (
            <Tab key={mode} label={modeLabels[mode]} value={index + 1} />
          ))}
        </Tabs>

        <Box sx={{ mt: 2 }}>
          {tabValue === 0 && (
            <StatsCard stats={data.ranked} title="랭크 전적" />
          )}
          {tabValue > 0 && (
            <StatsCard
              stats={{
                attributes: {
                  gameModeStats: {
                    [availableModes[tabValue - 1]]:
                      gameModes[availableModes[tabValue - 1]],
                  },
                },
              }}
              title={`${modeLabels[availableModes[tabValue - 1]]} 전적`}
            />
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            color: "#90caf9",
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
          }}
        >
          PUBG 전적 검색
        </Typography>

        <Paper
          sx={{
            p: 3,
            mb: 3,
            background: "linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            borderRadius: "12px",
          }}
        >
          <form onSubmit={handleSearch}>
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>플랫폼</InputLabel>
                <Select
                  value={platform}
                  label="플랫폼"
                  onChange={handlePlatformChange}
                >
                  <MenuItem value="kakao">카카오</MenuItem>
                  <MenuItem value="steam">스팀</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="outlined"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력하세요"
              />
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{ minWidth: "100px" }}
              >
                {loading ? <CircularProgress size={24} /> : "검색"}
              </Button>
            </Box>
          </form>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {data && data.player && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ color: "#90caf9" }}>
                {data.player.attributes.name}
              </Typography>
              <Divider sx={{ my: 2, bgcolor: "rgba(144, 202, 249, 0.2)" }} />
              {renderGameModeStats()}
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Search;
