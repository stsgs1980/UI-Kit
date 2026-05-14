// Layer 4: Features
// Complex interactive widgets with internal state.
// Has state and hooks, but self-contained. Data comes via props.

// ─── Page Compositions (Layer 5) ─────────────────────────────
export { LandingPremium } from './landing-premium'
export type { LandingPremiumProps } from './landing-premium'

// ─── Original ────────────────────────────────────────────────
export { IdeLayout } from './ide-layout'
export type { IdeLayoutProps, IdeFile, IdeTheme } from './ide-layout'

export { ResponsiveShowcase } from './responsive-showcase'
export type { ResponsiveShowcaseProps } from './responsive-showcase'

export { CommandPalette } from './command-palette'
export type { CommandPaletteProps } from './command-palette'

export { ThemeToggle } from './theme-toggle'
export type { ThemeToggleProps } from './theme-toggle'

export { SearchPanel } from './search-panel'
export type { SearchPanelProps } from './search-panel'

// ─── Extracted from Code-Realm ───────────────────────────────
export { FloatingDecorations } from './floating-decorations'
export type { FloatingDecorationsProps, FloatingSymbol } from './floating-decorations'

// ─── Extracted from Component-Browser ────────────────────────
export { ActivityTimeline } from './activity-timeline'
export type { ActivityTimelineProps, ActivityEntry, ActivityKind } from './activity-timeline'

// ─── Before/after comparison slider ─────────────────────────
export { CompareSlider } from './compare-slider'
export type { CompareSliderProps } from './compare-slider'

export { useCompareSlider } from './compare-slider'
export type { UseCompareSliderOptions, UseCompareSliderReturn } from './compare-slider'

// ─── Scroll progress ─────────────────────────────────────────
export { ScrollProgressBar } from './scroll-progress-bar'
export type { ScrollProgressBarProps } from './scroll-progress-bar'

// ─── Tier 1: Sci-Fi Primitives ────────────────────────────────
export { HudCard } from './hud-card'
export type { HudCardProps } from './hud-card'

export { ScifiSectionHeader } from './scifi-section-header'
export type { ScifiSectionHeaderProps } from './scifi-section-header'

export { AnimatedCounter } from './animated-counter'
export type { AnimatedCounterProps } from './animated-counter'

export { MiniSparkline } from './mini-sparkline'
export type { MiniSparklineProps } from './mini-sparkline'

export { TypingEffect } from './typing-effect'
export type { TypingEffectProps } from './typing-effect'

export { ScifiScrollProgress } from './scifi-scroll-progress'
export type { ScifiScrollProgressProps } from './scifi-scroll-progress'

export { BackToTop } from './back-to-top'
export type { BackToTopProps } from './back-to-top'

// ─── Tier 2: Small Composites ───────────────────────────────
export { ScifiButtonGroup } from './scifi-button-group'
export type { ScifiButtonGroupProps, ButtonGroupOption } from './scifi-button-group'

export { ScifiTabbedView } from './scifi-tabbed-view'
export type { ScifiTabbedViewProps, TabDefinition } from './scifi-tabbed-view'

// ─── ScifiBadge ──────────────────────────────────────────────
export { ScifiBadge } from './scifi-badge'
export type { ScifiBadgeProps, BadgeVariant, BadgeSize, BadgePreset } from './scifi-badge'

// ─── ScifiGauge ──────────────────────────────────────────────
export { ScifiGauge } from './scifi-gauge'
export type {
  ScifiGaugeProps,
  GaugeVariant,
  GaugeBaseProps,
  RingGaugeProps,
  ArcGaugeProps,
  LinearGaugeProps,
  SegmentedGaugeProps,
} from './scifi-gauge'

export { GaugeRing } from './scifi-gauge'
export { GaugeArc } from './scifi-gauge'
export { GaugeLinear } from './scifi-gauge'
export { GaugeSegmented } from './scifi-gauge'

// ─── ScifiCanvasChart ────────────────────────────────────────
export { ScifiCanvasChart } from './scifi-canvas-chart'
export type {
  ScifiCanvasChartProps,
  DataPoint,
  Series,
  ChartType,
  ReferenceLine,
  ZoneFill,
  ChartBaseProps,
  AreaChartProps,
  LineChartProps,
  BarChartProps,
  MultiLineChartProps,
} from './scifi-canvas-chart'

export { ChartArea } from './scifi-canvas-chart'
export { ChartBar } from './scifi-canvas-chart'
export { ChartMultiLine } from './scifi-canvas-chart'

// ─── ScifiTimeline ───────────────────────────────────────────
export { ScifiTimeline } from './scifi-timeline'
export type { ScifiTimelineProps, TimelineEvent, EventImportance as TimelineEventImportance } from './scifi-timeline'

// ─── ScifiCorrelationGrid ───────────────────────────────────
export { ScifiCorrelationGrid } from './scifi-correlation-grid'
export type { ScifiCorrelationGridProps } from './scifi-correlation-grid'
export { CorrelationMatrix } from './scifi-correlation-grid'
export type { CorrelationMatrixProps } from './scifi-correlation-grid'
export { PerformanceBars } from './scifi-correlation-grid'
export type { PerformanceBarsProps } from './scifi-correlation-grid'
export type { MatrixAsset, CorrelationData, PerformanceBar } from './scifi-correlation-grid'

// ─── ScifiScenarioCards ──────────────────────────────────────
export { ScifiScenarioCards } from './scifi-scenario-cards'
export type { ScifiScenarioCardsProps, Scenario as ScenarioCard, ScenarioSeverity as CardsScenarioSeverity } from './scifi-scenario-cards'

// ─── ScifiTickerBar ─────────────────────────────────────────
export { ScifiTickerBar } from './scifi-ticker-bar'
export type { ScifiTickerBarProps, TickerItem } from './scifi-ticker-bar'

// ─── ScifiLiveFeed ───────────────────────────────────────────
export { ScifiLiveFeed } from './scifi-live-feed'
export type { ScifiLiveFeedProps, FeedItem } from './scifi-live-feed'

// ─── ScifiRouteTable ──────────────────────────────────────
export { ScifiRouteTable } from './scifi-route-table'
export type { ScifiRouteTableProps, RouteItem, RouteRisk } from './scifi-route-table'

// ─── ScifiComparisonGrid ──────────────────────────────────
export { ScifiComparisonGrid, ComparisonCard } from './scifi-comparison-grid'
export type { ScifiComparisonGridProps, ComparisonCardProps, ComparisonCardData, MetricRow, SpreadItem } from './scifi-comparison-grid'

// ─── ScifiActorGrid ───────────────────────────────────────
export { ScifiActorGrid } from './scifi-actor-grid'
export type { ScifiActorGridProps } from './scifi-actor-grid'

export { ScifiTimelinePanel } from './scifi-actor-grid'
export type { ScifiTimelinePanelProps } from './scifi-actor-grid'

export type { Actor, StanceType, TimelineEventEntry, EventSeverity } from './scifi-actor-grid'

// ─── Tier 4-5: Ormuz-monitor Extractions (Batch 1) ───────────
export { ScifiCtaSection } from './scifi-cta-section'
export type { ScifiCtaSectionProps, CtaMetric } from './scifi-cta-section'

export { ScifiEventCalendar } from './scifi-event-calendar'
export type { ScifiEventCalendarProps, CalendarEvent, EventImportance as CalendarEventImportance, EventCategory } from './scifi-event-calendar'

export { ScifiTransitOverview } from './scifi-transit-overview'
export type { ScifiTransitOverviewProps, TransitStat, ExporterData, DependencyGauge, RiskLevel as TransitRiskLevel } from './scifi-transit-overview'

export { ScifiScenarioAnalysis } from './scifi-scenario-analysis'
export type { ScifiScenarioAnalysisProps, Scenario as AnalysisScenario, ScenarioSeverity as AnalysisScenarioSeverity, TimelineEvent as AnalysisTimeline, InfluenceFactor } from './scifi-scenario-analysis'

export { ScifiImpactBeneficiaries } from './scifi-impact-beneficiaries'
export type { ScifiImpactBeneficiariesProps, Beneficiary, BeneficiaryCategory, SummaryStat, AnalysisColumn } from './scifi-impact-beneficiaries'

export { ScifiNavBar, ScifiNavMobile } from './scifi-nav-bar'
export type { ScifiNavBarProps, NavSection, NavGroup } from './scifi-nav-bar'

// ─── Tier 4-5: Ormuz-monitor Extractions (Batch 2) ───────────

// ScifiHero
export { ScifiHero } from './scifi-hero'
export type { ScifiHeroProps, HeroMetric } from './scifi-hero'
export { FloatingParticles } from './scifi-hero'
export type { FloatingParticlesProps, ParticleSeed } from './scifi-hero'
export { RadarAnimation } from './scifi-hero'
export type { RadarAnimationProps } from './scifi-hero'

// ScifiLoadingScreen
export { ScifiLoadingScreen } from './scifi-loading-screen'
export type { ScifiLoadingScreenProps } from './scifi-loading-screen'
export { HexLoader } from './scifi-loading-screen'
export type { HexLoaderProps } from './scifi-loading-screen'
export { DataStream } from './scifi-loading-screen'
export type { DataStreamProps } from './scifi-loading-screen'
export type { LoadingMilestone } from './scifi-loading-screen'

// ScifiAlertPanel
export { ScifiAlertPanel } from './scifi-alert-panel'
export type { ScifiAlertPanelProps } from './scifi-alert-panel'
export { AlertRow } from './scifi-alert-panel'
export type { AlertRowProps } from './scifi-alert-panel'
export type { AlertItem as PanelAlertItem, AlertCategoryType, SeverityLevel, AlertCategoryConfig } from './scifi-alert-panel'

// ScifiAlertDashboard
export { ScifiAlertDashboard } from './scifi-alert-dashboard'
export type { ScifiAlertDashboardProps } from './scifi-alert-dashboard'
export { ThreatGauge } from './scifi-alert-dashboard'
export type { ThreatGaugeProps } from './scifi-alert-dashboard'
export { AlertStatsPanel } from './scifi-alert-dashboard'
export type { AlertStatsPanelProps } from './scifi-alert-dashboard'
export type { DashboardAlert, DashboardSeverity, DashboardCategory, AlertStats } from './scifi-alert-dashboard'

// ScifiNewsFeed
export { ScifiNewsFeed } from './scifi-news-feed'
export type { ScifiNewsFeedProps } from './scifi-news-feed'
export { HorizontalThreatGauge } from './scifi-news-feed'
export type { HorizontalThreatGaugeProps } from './scifi-news-feed'
export type { NewsItem, NewsSeverity, TrendingTopic } from './scifi-news-feed'

// ScifiChartGrid
export { ScifiChartGrid } from './scifi-chart-grid'
export type { ScifiChartGridProps } from './scifi-chart-grid'
export { ChartCard } from './scifi-chart-grid'
export type { ChartCardProps } from './scifi-chart-grid'
export type { ChartType as GridChartType, DataPoint as GridDataPoint, ChartConfig } from './scifi-chart-grid'

// ─── Batch 3: Ormuz-monitor Extractions (Data Components) ──
export { ScifiRiskMatrix } from './scifi-risk-matrix'
export type { RiskItem, ScifiRiskMatrixProps } from './scifi-risk-matrix'
export { RiskMatrixGrid } from './scifi-risk-matrix'
export { RiskMatrixDetails } from './scifi-risk-matrix'

export { ScifiAssetHeatmap } from './scifi-asset-heatmap'
export type { Asset, Sector, ScifiAssetHeatmapProps } from './scifi-asset-heatmap'
export { CorrelationGrid } from './scifi-asset-heatmap'
export { SectorBars } from './scifi-asset-heatmap'

export { ScifiPulseMeter } from './scifi-pulse-meter'
export type { SectorData, SentimentData, SentimentType, ScifiPulseMeterProps } from './scifi-pulse-meter'
export { PulseRing } from './scifi-pulse-meter'
export { PulseSectorBars } from './scifi-pulse-meter'

export { ScifiSentimentGauge } from './scifi-sentiment-gauge'
export type { SentimentIndicator, ScifiSentimentGaugeProps } from './scifi-sentiment-gauge'
export { MainGauge } from './scifi-sentiment-gauge'
export { MiniGaugeCard } from './scifi-sentiment-gauge'
export { TrendChart } from './scifi-sentiment-gauge'

export { ScifiTensionIndex } from './scifi-tension-index'
export type { RegionData, DriverData, ScifiTensionIndexProps } from './scifi-tension-index'
export { TensionGauge } from './scifi-tension-index'
export { TensionSparkline } from './scifi-tension-index'
export { RegionRow } from './scifi-tension-index'
export { DriverRow } from './scifi-tension-index'

export { ScifiCorrelationTable } from './scifi-correlation-table'
export type { CorrelationItem, ScifiCorrelationTableProps } from './scifi-correlation-table'
export { SparklineMini } from './scifi-correlation-table'
export { CorrelationRow } from './scifi-correlation-table'

// ─── Batch 6: Ormuz-monitor Extractions (Batch 6B) ──────────

// ScifiCostCalculator
export { ScifiCostCalculator } from './scifi-cost-calculator'
export type { ScifiCostCalculatorProps, CalculatorInput, CalculatorOutput, BreakdownItem, SelectOption } from './scifi-cost-calculator'
export { ScifiSlider } from './scifi-cost-calculator'
export type { ScifiSliderProps } from './scifi-cost-calculator'
export { ScifiSelect } from './scifi-cost-calculator'
export type { ScifiSelectProps } from './scifi-cost-calculator'
export { OutputPanel } from './scifi-cost-calculator'
export type { OutputPanelProps } from './scifi-cost-calculator'

// ScifiRegionMap
export { ScifiRegionMap } from './scifi-region-map'
export type { ScifiRegionMapProps } from './scifi-region-map'
export { RegionMapSvg } from './scifi-region-map'
export type { RegionMapSvgProps } from './scifi-region-map'
export { RegionDetail } from './scifi-region-map'
export type { RegionDetailProps } from './scifi-region-map'
export type { MapRegion, MapRoute, MapBase, RiskLevel as MapRiskLevel } from './scifi-region-map'
export { RISK_CONFIG } from './scifi-region-map'

// ScifiGlobeView
export { ScifiGlobeView } from './scifi-globe-view'
export type { ScifiGlobeViewProps } from './scifi-globe-view'
export { GlobeCanvas } from './scifi-globe-view'
export { GlobeLoader, GlobeHudOverlays, GlobeLegend, GlobeStatCards, RouteLegendItem } from './scifi-globe-view'
export type { GlobeNode, GlobeRoute, GlobeStat } from './scifi-globe-view'
export { latLonToVec3, generateArcPoints, GLOBE_RADIUS, ARC_SEGMENTS } from './scifi-globe-view'

// ScifiReserveMonitor
export { ScifiReserveMonitor } from './scifi-reserve-monitor'
export type { ScifiReserveMonitorProps } from './scifi-reserve-monitor'
export { ReserveCards } from './scifi-reserve-monitor'
export type { ReserveCardsProps } from './scifi-reserve-monitor'
export { CircularGauge, SparklineMini as ReserveSparklineMini, getTrendFillColor } from './scifi-reserve-monitor'
export type { CircularGaugeProps } from './scifi-reserve-monitor'
export type { ReserveRegion, SummaryStat as ReserveSummaryStat, Trend } from './scifi-reserve-monitor'
export { TREND_CONFIG } from './scifi-reserve-monitor'

// ScifiScenarioEngine
export { ScifiScenarioEngine } from './scifi-scenario-engine'
export type { ScifiScenarioEngineProps } from './scifi-scenario-engine'
export { FactorControls, ScoreDisplay } from './scifi-scenario-engine'
export type { FactorControlsProps } from './scifi-scenario-engine'
export type { FactorConfig, FactorValues, ScenarioPreset, ScenarioInfo, EngineTab } from './scifi-scenario-engine'
export { computeCompositeScore, getScoreColor, getScoreRgb, getFactorColor, matchScenario } from './scifi-scenario-engine'

// ─── Batch 7: Remaining Tier 4-5 Extractions ──────────────

// ScifiAssetTracker
export { ScifiAssetTracker } from './scifi-asset-tracker'
export type { ScifiAssetTrackerProps, AssetRegionStatus, AssetRegion } from './scifi-asset-tracker'

// ScifiChainTracker
export { ScifiChainTracker } from './scifi-chain-tracker'
export type { ScifiChainTrackerProps, DisruptionStatus, DisruptionSeverity, DisruptionTrend, KpiItem, DisruptionEvent } from './scifi-chain-tracker'

// ScifiComplianceTracker
export { ScifiComplianceTracker, ComplianceGauge, EntityRow, TimelineItem } from './scifi-compliance-tracker'
export type { ScifiComplianceTrackerProps, ComplianceEntity, TimelineEvent as ComplianceTimeline, Severity, ComplianceCategory } from './scifi-compliance-tracker'
export { SEVERITY_CONFIG as ComplianceSeverityConfig, CATEGORY_COLORS } from './scifi-compliance-tracker'

// ScifiDemandCurve
export { ScifiDemandCurve, DemandChart, ImpactRows } from './scifi-demand-curve'
export type { ScifiDemandCurveProps, DemandChartProps, ImpactRowsProps, KeyMetric, CountryImpact, SectorImpact, CurvePoint, ImpactSeverity } from './scifi-demand-curve'
export { SEVERITY_CONFIG as DemandSeverityConfig } from './scifi-demand-curve'

// ScifiDisruptionPanel
export { ScifiDisruptionPanel } from './scifi-disruption-panel'
export type { ScifiDisruptionPanelProps, DisruptionItemStatus, DisruptionItemType, DisruptionItem } from './scifi-disruption-panel'

// ScifiEnergyDashboard
export { ScifiEnergyDashboard, BalanceGauge, DashboardPanels } from './scifi-energy-dashboard'
export type { ScifiEnergyDashboardProps, BalanceGaugeProps, DashboardPanelsProps, ProducerData, UtilizationData, StatItem as EnergyStatItem, TrendDirection } from './scifi-energy-dashboard'
export { getTrendColor } from './scifi-energy-dashboard'

// ScifiEnvironmentalImpact
export { ScifiEnvironmentalImpact, ConditionPanel, ForecastChart as EnvForecastChart, StormRiskGauge } from './scifi-environmental-impact'
export type { ScifiEnvironmentalImpactProps, ConditionPanelProps, ForecastChartProps as EnvForecastChartProps, StormRiskGaugeProps, ConditionMetric, ForecastData, ImpactItem, ConditionSeverity } from './scifi-environmental-impact'
export { useAnimatedValue as useEnvAnimatedValue, getBarColor, getBarGlow, getGaugeColor, getRiskStatus } from './scifi-environmental-impact'

// ScifiFleetMonitor
export { ScifiFleetMonitor } from './scifi-fleet-monitor'
export type { ScifiFleetMonitorProps, VesselStatus, ThreatLevel, Vessel, SecurityZone } from './scifi-fleet-monitor'
export { useAnimatedValue as useFleetAnimatedValue } from './scifi-fleet-monitor'

// ScifiFlowTracker
export { ScifiFlowTracker } from './scifi-flow-tracker'
export type { ScifiFlowTrackerProps, PriceRegion, StorageLevel, PipelineFlow, TradeEntry } from './scifi-flow-tracker'

// ScifiForecastPanel
export { ScifiForecastPanel, FuturesCurveChart, ForecastChart as PriceForecastChart, ForecastLegend, SignalList } from './scifi-forecast-panel'
export type { ScifiForecastPanelProps, CurvePoint as ForecastCurvePoint, ForecastModel, SignalItem } from './scifi-forecast-panel'

// ScifiIndicatorPanel
export { ScifiIndicatorPanel, RSIChart, MACDChart, BollingerChart, IndicatorSignalCard, SummaryCard as IndicatorSummaryCard } from './scifi-indicator-panel'
export type { ScifiIndicatorPanelProps, IndicatorSignalProps, IndicatorConfig } from './scifi-indicator-panel'
export { calculateRSI, calculateEMA, calculateMACD, calculateBollinger } from './scifi-indicator-panel'

// ScifiInfrastructureMap
export { ScifiInfrastructureMap, InfraMap, NodeCard } from './scifi-infrastructure-map'
export type { ScifiInfrastructureMapProps, InfraMapProps, NodeCardProps, InfrastructureNode, NodeStatus, ThreatLevel as InfraThreatLevel, InfrastructureType, MapCoordinates } from './scifi-infrastructure-map'
export { STATUS_CONFIG, THREAT_CONFIG, TYPE_CONFIG } from './scifi-infrastructure-map'

// ScifiLevelAnalysis
export { ScifiLevelAnalysis, LevelChart as AnalysisLevelChart, LevelCards } from './scifi-level-analysis'
export type { ScifiLevelAnalysisProps, PricePoint, AnalysisLevel, IndicatorCard } from './scifi-level-analysis'

// ScifiProcessingPanel
export { ScifiProcessingPanel, TrendChart as ProcessingTrendChart, MiniSparkline as ProcessingSparkline, SpreadPanel, ProductPanel, UtilizationPanel } from './scifi-processing-panel'
export type { ScifiProcessingPanelProps, SpreadData, ProductData, UtilData, TrendPoint } from './scifi-processing-panel'
export { getUtilColor, getUtilLabel } from './scifi-processing-panel'

// ScifiSankeyFlow
export { ScifiSankeyFlow, SankeyDiagram } from './scifi-sankey-flow'
export type { ScifiSankeyFlowProps, SankeyDiagramProps, FlowNode, FlowRoute } from './scifi-sankey-flow'
export { SANKEY_LAYOUT, getControlX, getPathStartX, getPathEndX, buildBezierPath, getStrokeWidth } from './scifi-sankey-flow'

// ScifiStatsSection
export { ScifiStatsSection } from './scifi-stats-section'
export type { ScifiStatsSectionProps, StatMetric, GaugeEntry } from './scifi-stats-section'

// ScifiTransitMonitor
export { ScifiTransitMonitor } from './scifi-transit-monitor'
export type { ScifiTransitMonitorProps, MetricCard, VesselType } from './scifi-transit-monitor'

// ScifiPeriodSelector
export { ScifiPeriodSelector } from './scifi-period-selector'
export type { ScifiPeriodSelectorProps, PeriodOption } from './scifi-period-selector'

// ScifiCorrelationDashboard
export { ScifiCorrelationDashboard, CorrelationRow as DashboardCorrelationRow, AssetRow, CorrelationSparkline } from './scifi-correlation-dashboard'
export type {
  ScifiCorrelationDashboardProps,
  CorrelationItem as DashboardCorrelationItem,
  CorrelationAsset,
  CorrelationStat,
  CorrelationTrend,
  ColumnHeader,
  CorrelationPanelConfig,
  CorrelationRowProps,
  AssetRowProps,
  CorrelationSparklineProps,
} from './scifi-correlation-dashboard'

// ─── Batch 8: Naval Presence Extractions ──────────────────

// ScifiVersusPanel
export { ScifiVersusPanel } from './scifi-versus-panel'
export { VersusBar, VersusTeamCard } from './scifi-versus-panel'
export type { ScifiVersusPanelProps, VersusTeam, VersusStat, VersusBarItem, VersusBarProps, VersusTeamCardProps } from './scifi-versus-panel'

// ScifiTrackedAssets
export { ScifiTrackedAssets, AssetCard, ThreatBar } from './scifi-tracked-assets'
export { getThreatColor, getThreatGlow } from './scifi-tracked-assets'
export type { ScifiTrackedAssetsProps, TrackedAsset, TrackedAssetsInfo, ThreatBarProps, AssetCardProps } from './scifi-tracked-assets'

// ScifiTacticalMap
export { ScifiTacticalMap } from './scifi-tactical-map'
export { MapMarkers, MapLabels } from './scifi-tactical-map'
export type { ScifiTacticalMapProps, TacticalMarker, TacticalLabel, MapMarkersProps, MapLabelsProps } from './scifi-tactical-map'
