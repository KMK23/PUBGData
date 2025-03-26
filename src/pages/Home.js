import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search as SearchIcon,
  TrendingUp,
  SportsEsports,
  NewReleases,
  EmojiEvents,
  Speed,
  Group,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentSeason,
  fetchLeaderboard,
} from "../store/slices/playerSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { currentSeason, leaderboard, loading, error } = useSelector(
    (state) => state.player
  );
  const [selectedPlatform, setSelectedPlatform] = useState("kakao");
  const [selectedGameMode, setSelectedGameMode] = useState("solo");
  const [selectedMap, setSelectedMap] = useState("erangel");
  const [selectedWeaponCategory, setSelectedWeaponCategory] = useState("ar");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const news = [
    {
      title: "신규 시즌 업데이트",
      date: "2024-03-15",
      image: "https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg",
      description:
        "새로운 시즌이 시작되었습니다! 새로운 보상과 도전이 기다리고 있습니다.",
    },
    {
      title: "신규 무기 추가",
      date: "2024-03-10",
      image: "https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg",
      description:
        "새로운 무기가 추가되었습니다. 전장에서 더 강력한 전투를 경험하세요.",
    },
  ];

  const popularPlayers = [
    {
      name: "TGLTN",
      rank: 1,
      kd: "4.2",
      image:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg",
      platform: "스팀",
    },
    {
      name: "Kaymind",
      rank: 2,
      kd: "3.8",
      image:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg",
      platform: "스팀",
    },
    {
      name: "Pio",
      rank: 3,
      kd: "3.6",
      image:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg",
      platform: "카카오",
    },
  ];

  const features = [
    {
      title: "실시간 전적 검색",
      description: "PUBG 플레이어의 실시간 전적을 검색하고 확인하세요.",
      icon: <SearchIcon sx={{ fontSize: 40, color: "#90caf9" }} />,
    },
    {
      title: "상세 통계",
      description:
        "KDA, 승률, 평균 데미지 등 상세한 통계를 확인할 수 있습니다.",
      icon: <Speed sx={{ fontSize: 40, color: "#90caf9" }} />,
    },
    {
      title: "게임 모드별 분석",
      description: "솔로, 듀오, 스쿼드 등 각 게임 모드별 통계를 확인하세요.",
      icon: <Group sx={{ fontSize: 40, color: "#90caf9" }} />,
    },
  ];

  const maps = [
    {
      id: "erangel",
      name: "에란겔",
      vehicleImage: "/images/maps/erangel-car.png",
    },
    {
      id: "miramar",
      name: "미라마",
      vehicleImage: "/images/maps/miramar-car.png",
    },
    {
      id: "taego",
      name: "태이고",
      vehicleImage: "/images/maps/taego-car.png",
    },
  ];

  React.useEffect(() => {
    // 현재 시즌 정보 가져오기
    dispatch(fetchCurrentSeason({ platform: "kakao" }));
  }, [dispatch]);

  React.useEffect(() => {
    // 선택된 플랫폼과 게임 모드의 리더보드 가져오기
    dispatch(
      fetchLeaderboard({
        platform: selectedPlatform,
        gameMode: selectedGameMode,
      })
    );
  }, [dispatch, selectedPlatform, selectedGameMode]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#121212" }}>
      {/* 히어로 섹션 */}
      <Box
        sx={{
          background: "linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)",
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  color: "#90caf9",
                  fontWeight: "bold",
                }}
              >
                PUBG 전적 검색
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                paragraph
                sx={{ mb: 4 }}
              >
                당신의 PUBG 전적을 한눈에 확인하세요
              </Typography>
              <Button
                component={Link}
                to="/search"
                variant="contained"
                size="large"
                startIcon={<SearchIcon />}
                sx={{ mt: 2 }}
              >
                전적 검색하기
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg"
                alt="PUBG"
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* 주요 기능 */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: "#90caf9", mb: 4, textAlign: "center" }}
          >
            주요 기능
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    height: "100%",
                    background:
                      "linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    borderRadius: "12px",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {feature.icon}
                    <Typography
                      variant="h6"
                      sx={{ color: "#90caf9", mt: 2, mb: 1 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary" textAlign="center">
                      {feature.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 맵과 무기 정보 */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: "#90caf9", mb: 4, textAlign: "center" }}
          >
            맵과 무기 정보
          </Typography>
          <Grid container spacing={4}>
            {/* 맵 정보 */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  background:
                    "linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  borderRadius: "12px",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ color: "#90caf9", mb: 3 }}
                >
                  맵 정보
                </Typography>
                <Grid container spacing={3}>
                  {[
                    {
                      id: "erangel",
                      name: "에란겔",
                      image: "/images/maps/erangel.jpg",
                      description:
                        "클래식한 전장, 다양한 지형과 전술적 기회가 있는 8x8 맵",
                      features: "도시, 산악, 해안가 등 다양한 지형",
                    },
                    {
                      id: "miramar",
                      name: "미라마",
                      image: "/images/maps/miramar.jpg",
                      description: "사막 지형의 8x8 맵, 장거리 전투에 적합",
                      features: "사막, 도시, 산악 지형",
                    },
                    {
                      id: "sanhok",
                      name: "사녹",
                      image: "/images/maps/Sanhok.jpg",
                      description:
                        "정글과 열대 지형의 4x4 맵, 빠른 전투가 특징",
                      features: "정글, 해변, 도시",
                    },
                    {
                      id: "vikendi",
                      name: "비켄디",
                      image: "/images/maps/vikendi.jpg",
                      description:
                        "눈과 얼음이 있는 6x6 맵, 다양한 전술적 선택지",
                      features: "설원, 도시, 산악",
                    },
                    {
                      id: "taego",
                      name: "태이고",
                      image: "/images/maps/taego.jpg",
                      description:
                        "한국을 모티브로 한 8x8 맵, 다양한 전투 환경",
                      features: "도시, 농촌, 산악",
                    },
                    {
                      id: "deston",
                      name: "데스턴",
                      image: "/images/maps/deston.jpg",
                      description: "미래 도시와 자연이 공존하는 8x8 맵",
                      features: "미래 도시, 습지, 산악",
                    },
                  ].map((map) => (
                    <Grid item xs={12} sm={6} md={4} key={map.id}>
                      <Card
                        sx={{
                          height: "100%",
                          background:
                            "linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 100%)",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                          borderRadius: "12px",
                          transition: "transform 0.2s",
                          "&:hover": {
                            transform: "translateY(-5px)",
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={map.image}
                          alt={map.name}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h3"
                            sx={{ color: "#90caf9" }}
                          >
                            {map.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            paragraph
                          >
                            {map.description}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontStyle: "italic" }}
                          >
                            {map.features}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            {/* 무기 정보 */}
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  background:
                    "linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  borderRadius: "12px",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ color: "#90caf9", mb: 3 }}
                >
                  무기 정보
                </Typography>

                {/* 무기 카테고리 선택 */}
                <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
                  {[
                    { id: "ar", name: "돌격소총" },
                    { id: "dmr", name: "지정사수소총" },
                    { id: "smg", name: "기관단총" },
                    { id: "sr", name: "저격소총" },
                    { id: "sg", name: "산탄총" },
                  ].map((category) => (
                    <Button
                      key={category.id}
                      variant={
                        selectedWeaponCategory === category.id
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() => setSelectedWeaponCategory(category.id)}
                      sx={{
                        color:
                          selectedWeaponCategory === category.id
                            ? "white"
                            : "#90caf9",
                        borderColor: "#90caf9",
                        "&:hover": {
                          borderColor: "#90caf9",
                          backgroundColor: "rgba(144, 202, 249, 0.1)",
                        },
                      }}
                    >
                      {category.name}
                    </Button>
                  ))}
                </Box>

                {/* 무기 목록 */}
                <Grid container spacing={3}>
                  {[
                    {
                      category: "ar",
                      weapons: [
                        {
                          name: "M416",
                          image: "/images/weapons/m416.png",
                          damage: "41",
                          fireRate: "75",
                          description: "안정적인 반동과 빠른 발사 속도가 특징",
                        },
                        {
                          name: "ACE32",
                          image: "/images/weapons/ace.png",
                          damage: "42",
                          fireRate: "72",
                          description: "안정적인 성능과 적절한 데미지",
                        },
                        {
                          name: "AUG A3",
                          image: "/images/weapons/aug.png",
                          damage: "42",
                          fireRate: "72",
                          description: "낮은 반동과 안정적인 성능이 특징",
                        },
                        {
                          name: "Beryl M762",
                          image: "/images/weapons/beryl.png",
                          damage: "47",
                          fireRate: "70",
                          description: "강력한 데미지와 높은 반동이 특징",
                        },
                      ],
                    },
                    {
                      category: "dmr",
                      weapons: [
                        {
                          name: "Dragunov",
                          image: "/images/weapons/dragunov.png",
                          damage: "62",
                          fireRate: "55",
                          description: "강력한 데미지와 빠른 발사 속도",
                        },
                        {
                          name: "Mini 14",
                          image: "/images/weapons/mini.png",
                          damage: "46",
                          fireRate: "80",
                          description: "빠른 발사 속도와 낮은 반동이 특징",
                        },
                        {
                          name: "MK12",
                          image: "/images/weapons/mk12.png",
                          damage: "48",
                          fireRate: "75",
                          description: "안정적인 성능과 적절한 데미지",
                        },
                        {
                          name: "MK14",
                          image: "/images/weapons/mk14.png",
                          damage: "61",
                          fireRate: "65",
                          description: "가장 강력한 데미지를 가진 DMR",
                        },
                        {
                          name: "QBU",
                          image: "/images/weapons/qbu.png",
                          damage: "47",
                          fireRate: "70",
                          description: "중국제 DMR, 안정적인 성능",
                        },
                        {
                          name: "SLR",
                          image: "/images/weapons/slr.png",
                          damage: "58",
                          fireRate: "60",
                          description: "강력한 데미지와 높은 반동이 특징",
                        },
                      ],
                    },
                    {
                      category: "smg",
                      weapons: [
                        {
                          name: "MP5K",
                          image: "/images/weapons/mp5k.png",
                          damage: "33",
                          fireRate: "85",
                          description: "빠른 발사 속도와 낮은 반동",
                        },
                        {
                          name: "P90",
                          image: "/images/weapons/p90.png",
                          damage: "35",
                          fireRate: "90",
                          description: "매우 빠른 발사 속도와 큰 탄창",
                        },
                        {
                          name: "UMP45",
                          image: "/images/weapons/ump.png",
                          damage: "35",
                          fireRate: "70",
                          description: "안정적인 성능과 적절한 데미지",
                        },
                        {
                          name: "Vector",
                          image: "/images/weapons/vector.png",
                          damage: "31",
                          fireRate: "95",
                          description: "가장 빠른 발사 속도를 가진 SMG",
                        },
                      ],
                    },
                    {
                      category: "sr",
                      weapons: [
                        {
                          name: "M24",
                          image: "/images/weapons/m24.png",
                          damage: "79",
                          fireRate: "40",
                          description: "Kar98k보다 강력한 데미지",
                        },
                        {
                          name: "Kar98k",
                          image: "/images/weapons/kar98.png",
                          damage: "75",
                          fireRate: "40",
                          description: "클래식한 볼트액션 저격소총",
                        },
                        {
                          name: "Lynx AMR",
                          image: "/images/weapons/lynx.png",
                          damage: "90",
                          fireRate: "35",
                          description: "강력한 데미지와 관통력",
                        },
                        {
                          name: "AWM",
                          image: "/images/weapons/awm.png",
                          damage: "105",
                          fireRate: "35",
                          description: "가장 강력한 데미지를 가진 저격소총",
                        },
                      ],
                    },
                    {
                      category: "sg",
                      weapons: [
                        {
                          name: "S686",
                          image: "/images/weapons/s686.png",
                          damage: "24",
                          fireRate: "30",
                          description: "더블 배럴 샷건, 강력한 근접 전투용",
                        },
                        {
                          name: "S1897",
                          image: "/images/weapons/s1897.png",
                          damage: "24",
                          fireRate: "30",
                          description: "펌프액션 샷건, 안정적인 근접 전투용",
                        },
                      ],
                    },
                  ].map((category) => (
                    <Grid item xs={12} key={category.category}>
                      {selectedWeaponCategory === category.category && (
                        <Grid container spacing={2}>
                          {category.weapons.map((weapon) => (
                            <Grid item xs={12} sm={6} md={4} key={weapon.name}>
                              <Card
                                sx={{
                                  height: "100%",
                                  background:
                                    "linear-gradient(145deg, #2d2d2d 0%, #1a1a1a 100%)",
                                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                                  borderRadius: "12px",
                                  transition: "transform 0.2s",
                                  "&:hover": {
                                    transform: "translateY(-5px)",
                                  },
                                  cursor: "pointer",
                                }}
                              >
                                <CardMedia
                                  component="img"
                                  height="140"
                                  image={weapon.image}
                                  alt={weapon.name}
                                />
                                <CardContent>
                                  <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="h3"
                                    sx={{ color: "#90caf9" }}
                                  >
                                    {weapon.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    paragraph
                                  >
                                    데미지: {weapon.damage} | 발사속도:{" "}
                                    {weapon.fireRate}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {weapon.description}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* 맵 차량 위치 섹션 */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: "#90caf9", mb: 4, textAlign: "center" }}
          >
            맵별 차량 위치
          </Typography>
          <Grid container spacing={4}>
            {maps.map((map) => (
              <Grid item xs={12} md={4} key={map.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background:
                      "linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    borderRadius: "12px",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h3"
                      sx={{ color: "#90caf9", mb: 2 }}
                    >
                      {map.name}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => setSelectedMap(map.id)}
                      sx={{
                        bgcolor: "#1a237e",
                        color: "white",
                        "&:hover": {
                          bgcolor: "#0d47a1",
                        },
                      }}
                    >
                      차량 위치 보기
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* 선택된 맵의 차량 위치 이미지 */}
          {selectedMap && (
            <Box
              sx={{
                mt: 4,
                p: 3,
                background: "linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "#90caf9", textAlign: "center", mb: 3 }}
              >
                {maps.find((m) => m.id === selectedMap)?.name} 차량 위치
              </Typography>
              <Box
                component="img"
                src={maps.find((m) => m.id === selectedMap)?.vehicleImage}
                alt="차량 위치"
                sx={{
                  width: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                  mb: 3,
                }}
              />

              {/* 차량 정보 */}
              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#90caf9", textAlign: "center", mb: 2 }}
                >
                  차량 정보
                </Typography>
                <Grid container spacing={1}>
                  {selectedMap === "erangel" && (
                    <>
                      <Grid item xs={12} sm={6} md={2.4}>
                        <Box
                          sx={{
                            p: 0.5,
                            borderRadius: 1,
                            bgcolor: "#dda0dd",
                            textAlign: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          }}
                        >
                          UAZ (100%)
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2.4}>
                        <Box
                          sx={{
                            p: 0.5,
                            borderRadius: 1,
                            bgcolor: "#800080",
                            textAlign: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          }}
                        >
                          다시아 (100%)
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2.4}>
                        <Box
                          sx={{
                            p: 0.5,
                            borderRadius: 1,
                            bgcolor: "#ff0000",
                            textAlign: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          }}
                        >
                          탈것 (50%)
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2.4}>
                        <Box
                          sx={{
                            p: 0.5,
                            borderRadius: 1,
                            bgcolor: "#9370db",
                            textAlign: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          }}
                        >
                          보트 (100%)
                        </Box>
                      </Grid>
                    </>
                  )}

                  {selectedMap === "miramar" && (
                    <>
                      <Grid item xs={12} sm={6} md={2}>
                        <Box
                          sx={{
                            p: 0.5,
                            borderRadius: 1,
                            bgcolor: "#ffd800",
                            textAlign: "center",
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          }}
                        >
                          황금미라도 (100%)
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <Box
                          sx={{
                            p: 0.5,
                            borderRadius: 1,
                            bgcolor: "#800080",
                            textAlign: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          }}
                        >
                          미라도 (100%)
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <Box
                          sx={{
                            p: 0.5,
                            borderRadius: 1,
                            bgcolor: "#dda0dd",
                            textAlign: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          }}
                        >
                          픽업트럭 (50%)
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <Box
                          sx={{
                            p: 0.5,
                            borderRadius: 1,
                            bgcolor: "#f5dfb3",
                            textAlign: "center",
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          }}
                        >
                          탈것 (48%)
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <Box
                          sx={{
                            p: 0.5,
                            borderRadius: 1,
                            bgcolor: "#9370db",
                            textAlign: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          }}
                        >
                          보트 (100%)
                        </Box>
                      </Grid>
                    </>
                  )}

                  {selectedMap === "taego" && (
                    <>
                      <Grid item xs={12} sm={6} md={4}>
                        <Box
                          sx={{
                            p: 0.5,
                            borderRadius: 1,
                            bgcolor: "#ff0000",
                            textAlign: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          }}
                        >
                          포니 (100%)
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Box
                          sx={{
                            p: 0.5,
                            borderRadius: 1,
                            bgcolor: "#dda0dd",
                            textAlign: "center",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          }}
                        >
                          포터 (100%)
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <Box
                          sx={{
                            p: 0.5,
                            borderRadius: 1,
                            bgcolor: "#f5dfb3",
                            textAlign: "center",
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                          }}
                        >
                          탈것 (53%)
                        </Box>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
            </Box>
          )}
        </Box>

        {/* 리더보드 */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: "#90caf9", mb: 4, textAlign: "center" }}
          >
            솔로 모드 랭킹
          </Typography>
          <Paper
            sx={{
              p: 3,
              background: "linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              borderRadius: "12px",
            }}
          >
            {/* 플랫폼과 게임 모드 선택 */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  플랫폼
                </label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="kakao">카카오</option>
                  <option value="steam">스팀</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  게임 모드
                </label>
                <select
                  value={selectedGameMode}
                  onChange={(e) => setSelectedGameMode(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="solo">솔로</option>
                  <option value="duo">듀오</option>
                  <option value="squad">스쿼드</option>
                </select>
              </div>
            </div>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="text.secondary" textAlign="center">
                {error}
              </Typography>
            ) : leaderboard?.data ? (
              <Box>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  플랫폼: {leaderboard.data.attributes.shardId}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  게임 모드: {leaderboard.data.attributes.gameMode}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  시즌: {leaderboard.data.attributes.seasonId}
                </Typography>
                {leaderboard.data.relationships?.players?.data?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            순위
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            닉네임
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            점수
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {leaderboard.data.relationships.players.data.map(
                          (player, index) => (
                            <tr key={player.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {index + 1}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {player.attributes?.name || "알 수 없음"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {player.attributes?.stats?.rankPoints || "0"}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <Typography color="text.secondary" textAlign="center">
                    현재 리더보드 데이터가 없습니다.
                  </Typography>
                )}
              </Box>
            ) : (
              <Typography color="text.secondary" textAlign="center">
                리더보드 데이터를 불러오는 중...
              </Typography>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
