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
  Dialog,
  DialogContent,
  DialogActions,
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
  const [selectedMap, setSelectedMap] = useState(null);
  const [selectedWeaponCategory, setSelectedWeaponCategory] = useState("ar");
  const [selectedMapForZoom, setSelectedMapForZoom] = useState(null);
  const [selectedMapForVehicle, setSelectedMapForVehicle] = useState(null);
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
      image: "/images/maps/erangel.jpg",
      description: "8x8km 크기의 러시아식 군사기지가 있는 섬",
      features: [
        "다양한 지형과 전략적 포인트",
        "군사기지, 야스나야 폴리아나 등 인기 지역",
        "해안가 보트 루트",
        "도시/야외 전투 모두 가능",
      ],
      landmarks: [
        "군사기지: 최고급 전리품",
        "야스나야 폴리아나: 대규모 도시 전투",
        "학교: 인기 초반 전투 지역",
        "조지폴: 항구 도시",
      ],
    },
    {
      id: "miramar",
      name: "미라마",
      image: "/images/maps/miramar.jpg",
      description: "8x8km 크기의 사막 맵으로, 멕시코 북부를 모티브로 제작",
      features: [
        "광활한 사막과 구릉지대",
        "높은 지형을 이용한 저격전",
        "오프로드 차량 활용",
        "복잡한 도시 구조",
      ],
      landmarks: [
        "페카도: 가장 큰 도시",
        "로스 레오네스: 복잡한 도시 전투",
        "임팔라: 중앙 주요 전투 지역",
        "몬테 누에보: 높은 지형 전투",
      ],
    },
    {
      id: "sanhok",
      name: "사녹",
      image: "/images/maps/Sanhok.jpg",
      description:
        "4x4km 크기의 정글 맵으로, 동남아시아의 열대 환경을 모티브로 제작",
      features: [
        "정글과 열대 지형",
        "빠른 전투와 높은 템포",
        "복잡한 정글 지형",
        "다양한 수송 수단",
      ],
      landmarks: [
        "부트캠프: 군사 훈련장",
        "파라다이스 리조트: 호화로운 리조트",
        "사원: 전략적 포인트",
        "해변: 보트 이동",
      ],
    },
    {
      id: "taego",
      name: "태이고",
      image: "/images/maps/taego.jpg",
      description: "한국을 모티브로 한 8x8km 크기의 맵",
      features: [
        "한국의 시골 마을과 도시 재현",
        "넓은 들판과 산악 지형",
        "컴백 시스템 도입",
        "자체 구조 시스템",
      ],
      landmarks: [
        "태이고 시티: 현대적 도시 전투",
        "호산: 전통 마을",
        "공장: 산업단지 전투",
      ],
    },
    {
      id: "vikendi",
      name: "비켄디",
      image: "/images/maps/vikendi.jpg",
      description:
        "8x8km 크기의 설원 맵으로, 동유럽의 겨울 풍경을 모티브로 제작",
      features: [
        "설원과 얼음 환경",
        "스키장과 리조트",
        "동굴과 지하 시설",
        "눈 위 전투",
      ],
      landmarks: [
        "코스타나: 중앙 주요 도시",
        "스키장: 높은 지형 전투",
        "동굴: 은신과 이동",
        "포베다: 항구 도시",
      ],
    },
    {
      id: "deston",
      name: "데스턴",
      image: "/images/maps/deston.jpg",
      description: "8x8km 크기의 미래 도시 맵으로, 현대와 미래가 공존하는 환경",
      features: [
        "미래 도시와 자연의 조화",
        "고층 빌딩과 슬럼가",
        "하이테크 시설",
        "다양한 수송 수단",
      ],
      landmarks: [
        "리버랜드: 미래 도시 중심지",
        "슬럼가: 도시 전투",
        "하이테크 시설: 최신 장비",
        "항구: 보트 이동",
      ],
    },
  ];

  const vehicleMaps = [
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

  const mapDetails = {
    erangel: {
      description: `에란겔은 PUBG의 첫 번째 맵으로, 8x8km 크기의 러시아식 군사기지가 있는 섬입니다.

주요 특징
• 다양한 지형과 전략적 포인트
• 군사기지, 야스나야 폴리아나 등 인기 지역
• 해안가 보트 루트
• 도시/야외 전투 모두 가능

주요 랜드마크
• 군사기지: 최고급 전리품
• 야스나야 폴리아나: 대규모 도시 전투
• 학교: 인기 초반 전투 지역
• 조지폴: 항구 도시`,
    },
    miramar: {
      description: `미라마는 8x8km 크기의 사막 맵으로, 멕시코 북부를 모티브로 제작되었습니다.

주요 특징
• 광활한 사막과 구릉지대
• 높은 지형을 이용한 저격전
• 오프로드 차량 활용
• 복잡한 도시 구조

주요 랜드마크
• 페카도: 가장 큰 도시
• 로스 레오네스: 복잡한 도시 전투
• 임팔라: 중앙 주요 전투 지역
• 몬테 누에보: 높은 지형 전투`,
    },
    taego: {
      description: `태이고는 한국을 모티브로 한 8x8km 크기의 맵입니다.

주요 특징
• 한국의 시골 마을과 도시 재현
• 넓은 들판과 산악 지형
• 컴백 시스템 도입
• 자체 구조 시스템

주요 랜드마크
• 태이고 시티: 현대적 도시 전투
• 호산: 전통 마을
• 공장: 산업단지 전투`,
    },
    vikendi: {
      description: `비켄디는 8x8km 크기의 설원 맵으로, 동유럽의 겨울 풍경을 모티브로 제작되었습니다.

주요 특징
• 설원과 얼음 환경
• 스키장과 리조트
• 동굴과 지하 시설
• 눈 위 전투

주요 랜드마크
• 코스타나: 중앙 주요 도시
• 스키장: 높은 지형 전투
• 동굴: 은신과 이동
• 포베다: 항구 도시`,
    },
    deston: {
      description: `데스턴은 8x8km 크기의 미래 도시 맵으로, 현대와 미래가 공존하는 환경을 제공합니다.

주요 특징
• 미래 도시와 자연의 조화
• 고층 빌딩과 슬럼가
• 하이테크 시설
• 다양한 수송 수단

주요 랜드마크
• 리버랜드: 미래 도시 중심지
• 슬럼가: 도시 전투
• 하이테크 시설: 최신 장비
• 항구: 보트 이동`,
    },
    sanhok: {
      description: `사녹은 4x4km 크기의 정글 맵으로, 동남아시아의 열대 환경을 모티브로 제작되었습니다.

주요 특징
• 정글과 열대 지형
• 빠른 전투와 높은 템포
• 복잡한 정글 지형
• 다양한 수송 수단

주요 랜드마크
• 부트캠프: 군사 훈련장
• 파라다이스 리조트: 호화로운 리조트
• 사원: 전략적 포인트
• 해변: 보트 이동`,
    },
  };

  const handleMapClick = (mapName) => {
    setSelectedMap(mapName);
    setSelectedMapForZoom(mapName);
  };

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
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  component={Link}
                  to="/search"
                  variant="contained"
                  size="large"
                  startIcon={<SearchIcon />}
                >
                  전적 검색하기
                </Button>
                <Button
                  component={Link}
                  to="/stats"
                  variant="contained"
                  size="large"
                  startIcon={<TrendingUp />}
                >
                  내 전체 통계 확인하기
                </Button>
              </Box>
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
        {/* 랭크 시스템 표 */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: "#90caf9", mb: 4, textAlign: "center" }}
          >
            배틀그라운드 랭크 시스템
          </Typography>
          <Grid container spacing={2}>
            {[
              {
                title: "브론즈",
                color: "#63432e",
                scoreColor: "#8b4513",
                badge: "/images/badges/bronze.webp",
                tiers: [
                  { tier: "V", range: "1000 ~ 1099" },
                  { tier: "IV", range: "1100 ~ 1199" },
                  { tier: "III", range: "1200 ~ 1299" },
                  { tier: "II", range: "1300 ~ 1399" },
                  { tier: "I", range: "1400 ~ 1499" },
                ],
              },
              {
                title: "실버",
                color: "#6d7277",
                scoreColor: "#808080",
                badge: "/images/badges/silver.webp",
                tiers: [
                  { tier: "V", range: "1500 ~ 1599" },
                  { tier: "IV", range: "1600 ~ 1699" },
                  { tier: "III", range: "1700 ~ 1799" },
                  { tier: "II", range: "1800 ~ 1899" },
                  { tier: "I", range: "1900 ~ 1999" },
                ],
              },
              {
                title: "골드",
                color: "#cdcfd3",
                scoreColor: "#daa520",
                badge: "/images/badges/gold.webp",
                tiers: [
                  { tier: "V", range: "2000 ~ 2099" },
                  { tier: "IV", range: "2100 ~ 2199" },
                  { tier: "III", range: "2200 ~ 2299" },
                  { tier: "II", range: "2300 ~ 2399" },
                  { tier: "I", range: "2400 ~ 2499" },
                ],
              },
              {
                title: "플래티넘",
                color: "#6c8a9d",
                scoreColor: "#4682b4",
                badge: "/images/badges/platinum.webp",
                tiers: [
                  { tier: "V", range: "2500 ~ 2599" },
                  { tier: "IV", range: "2600 ~ 2699" },
                  { tier: "III", range: "2700 ~ 2799" },
                  { tier: "II", range: "2800 ~ 2899" },
                  { tier: "I", range: "2900 ~ 2999" },
                ],
              },
              {
                title: "다이아몬드",
                color: "#454864",
                scoreColor: "#483d8b",
                badge: "/images/badges/diamond.webp",
                tiers: [
                  { tier: "V", range: "3000 ~ 3099" },
                  { tier: "IV", range: "3100 ~ 3199" },
                  { tier: "III", range: "3200 ~ 3299" },
                  { tier: "II", range: "3300 ~ 3399" },
                  { tier: "I", range: "3400 ~ 3499" },
                ],
              },
              {
                title: "마스터",
                color: "#c29d49",
                scoreColor: "#b8860b",
                badge: "/images/badges/master.webp",
                tiers: [{ tier: "", range: "3499 RP 초과" }],
              },
            ].map((rank) => (
              <Grid item xs={12} md={4} key={rank.title}>
                <Paper sx={{ p: 2, bgcolor: rank.color, borderRadius: "12px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      gap: 2,
                    }}
                  >
                    <Box
                      component="img"
                      src={rank.badge}
                      alt={rank.title}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ color: "white", textAlign: "center" }}
                    >
                      {rank.title}
                    </Typography>
                  </Box>
                  {rank.tiers.map((tier) => (
                    <Box
                      key={tier.tier}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                        p: 1,
                        borderRadius: "8px",
                        bgcolor: rank.scoreColor,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#ffffff",
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                        }}
                      >
                        {rank.title} {tier.tier}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#ffd700",
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                        }}
                      >
                        {tier.range}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

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
                  {maps.map((map) => (
                    <Grid item xs={12} sm={6} md={4} key={map.id}>
                      <Card
                        onClick={() => setSelectedMapForZoom(map)}
                        sx={{
                          cursor: "pointer",
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
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {/* 선택된 맵의 상세 정보 */}
                {selectedMapForZoom && (
                  <Box
                    sx={{
                      mt: 4,
                      display: "flex",
                      gap: 3,
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Box
                        component="img"
                        src={selectedMapForZoom.image}
                        alt={selectedMapForZoom.name}
                        sx={{
                          width: "100%",
                          borderRadius: "8px",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: "#90caf9" }}
                      >
                        {selectedMapForZoom.name} 상세 정보
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ whiteSpace: "pre-line", color: "text.secondary" }}
                      >
                        {selectedMapForZoom.description}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: "#90caf9", mt: 3, mb: 1 }}
                      >
                        주요 특징
                      </Typography>
                      <Box sx={{ mb: 3 }}>
                        {selectedMapForZoom.features.map((feature, index) => (
                          <Typography
                            key={index}
                            color="text.secondary"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            • {feature}
                          </Typography>
                        ))}
                      </Box>
                      <Typography variant="h6" sx={{ color: "#90caf9", mb: 1 }}>
                        주요 랜드마크
                      </Typography>
                      <Box>
                        {selectedMapForZoom.landmarks.map((landmark, index) => (
                          <Typography
                            key={index}
                            color="text.secondary"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            • {landmark}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                )}
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

        {/* 맵별 차량 위치 섹션 */}
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
            {vehicleMaps.map((map) => (
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
                {vehicleMaps.find((m) => m.id === selectedMap)?.name} 차량 위치
              </Typography>
              <Box
                component="img"
                src={
                  vehicleMaps.find((m) => m.id === selectedMap)?.vehicleImage
                }
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
                      <Grid item xs={12} sm={6} md={2.4}>
                        <Box
                          sx={{
                            p: 0.5,
                            borderRadius: 1,
                            bgcolor: "#ffd800",
                            textAlign: "center",
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          황금미라도 (100%)
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
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          미라도 (100%)
                        </Box>
                      </Grid>
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
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          픽업트럭 (50%)
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={2.4}>
                        <Box
                          sx={{
                            p: 0.5,
                            borderRadius: 1,
                            bgcolor: "#f5dfb3",
                            textAlign: "center",
                            color: "black",
                            fontWeight: "bold",
                            fontSize: "0.8rem",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          탈것 (48%)
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
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
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
      </Container>
    </Box>
  );
};

export default Home;
