import type { ComponentType } from 'react'

// ─── Features (non-scifi) ──────────────────────────────────
import { AnimatedCounter } from '@stsgs/ui/features/animated-counter/animated-counter'
import { CompareSlider } from '@stsgs/ui/features/compare-slider/compare-slider'
import { HudCard } from '@stsgs/ui/features/hud-card/hud-card'
import { MiniSparkline } from '@stsgs/ui/features/mini-sparkline/mini-sparkline'
import { SearchPanel } from '@stsgs/ui/features/search-panel/search-panel'
import { TypingEffect } from '@stsgs/ui/features/typing-effect/typing-effect'

// ─── Features (scifi a-l) ──────────────────────────────────
import { ScifiActorGrid } from '@stsgs/ui/features/scifi-actor-grid/scifi-actor-grid'
import { ScifiAlertDashboard } from '@stsgs/ui/features/scifi-alert-dashboard/scifi-alert-dashboard'
import { ScifiAlertPanel } from '@stsgs/ui/features/scifi-alert-panel/scifi-alert-panel'
import { ScifiAssetHeatmap } from '@stsgs/ui/features/scifi-asset-heatmap/scifi-asset-heatmap'
import { ScifiAssetTracker } from '@stsgs/ui/features/scifi-asset-tracker/scifi-asset-tracker'
import { ScifiBadge } from '@stsgs/ui/features/scifi-badge/scifi-badge'
import { ScifiButtonGroup } from '@stsgs/ui/features/scifi-button-group/scifi-button-group'
import { ScifiCanvasChart } from '@stsgs/ui/features/scifi-canvas-chart/scifi-canvas-chart'
import { ScifiChainTracker } from '@stsgs/ui/features/scifi-chain-tracker/scifi-chain-tracker'
import { ScifiChartGrid } from '@stsgs/ui/features/scifi-chart-grid/scifi-chart-grid'
import { ScifiComparisonGrid } from '@stsgs/ui/features/scifi-comparison-grid/scifi-comparison-grid'
import { ScifiComplianceTracker } from '@stsgs/ui/features/scifi-compliance-tracker/scifi-compliance-tracker'
import { ScifiCostCalculator } from '@stsgs/ui/features/scifi-cost-calculator/scifi-cost-calculator'
import { ScifiCorrelationDashboard } from '@stsgs/ui/features/scifi-correlation-dashboard/correlation-dashboard'
import { ScifiCorrelationGrid } from '@stsgs/ui/features/scifi-correlation-grid/scifi-correlation-grid'
import { ScifiCorrelationTable } from '@stsgs/ui/features/scifi-correlation-table/scifi-correlation-table'
import { ScifiCtaSection } from '@stsgs/ui/features/scifi-cta-section/scifi-cta-section'
import { ScifiDemandCurve } from '@stsgs/ui/features/scifi-demand-curve/scifi-demand-curve'
import { ScifiDisruptionPanel } from '@stsgs/ui/features/scifi-disruption-panel/scifi-disruption-panel'
import { ScifiEnergyDashboard } from '@stsgs/ui/features/scifi-energy-dashboard/scifi-energy-dashboard'
import { ScifiEventCalendar } from '@stsgs/ui/features/scifi-event-calendar/scifi-event-calendar'
import { ScifiForecastPanel } from '@stsgs/ui/features/scifi-forecast-panel/scifi-forecast-panel'
import { ScifiFleetMonitor } from '@stsgs/ui/features/scifi-fleet-monitor/scifi-fleet-monitor'
import { ScifiFlowTracker } from '@stsgs/ui/features/scifi-flow-tracker/scifi-flow-tracker'
import { ScifiGauge } from '@stsgs/ui/features/scifi-gauge/scifi-gauge'
import { ScifiHero } from '@stsgs/ui/features/scifi-hero/scifi-hero'
import { ScifiImpactBeneficiaries } from '@stsgs/ui/features/scifi-impact-beneficiaries/scifi-impact-beneficiaries'
import { ScifiIncidentTracker } from '@stsgs/ui/features/scifi-incident-tracker/scifi-incident-tracker'
import { ScifiIndicatorPanel } from '@stsgs/ui/features/scifi-indicator-panel/scifi-indicator-panel'
import { ScifiInfrastructureMap } from '@stsgs/ui/features/scifi-infrastructure-map/scifi-infrastructure-map'
import { ScifiLevelAnalysis } from '@stsgs/ui/features/scifi-level-analysis/scifi-level-analysis'
import { ScifiLoadingScreen } from '@stsgs/ui/features/scifi-loading-screen/scifi-loading-screen'
import { ScifiLiveFeed } from '@stsgs/ui/features/scifi-live-feed/scifi-live-feed'
import { ScifiNavBar } from '@stsgs/ui/features/scifi-nav-bar/scifi-nav-bar'
import { ScifiNewsFeed } from '@stsgs/ui/features/scifi-news-feed/scifi-news-feed'

// ─── Features (scifi p-z) ──────────────────────────────────
import { ScifiPeriodSelector } from '@stsgs/ui/features/scifi-period-selector/period-selector'
import { ScifiProcessingPanel } from '@stsgs/ui/features/scifi-processing-panel/scifi-processing-panel'
import { ScifiPulseMeter } from '@stsgs/ui/features/scifi-pulse-meter/scifi-pulse-meter'
import { ScifiRegionMap } from '@stsgs/ui/features/scifi-region-map/scifi-region-map'
import { ScifiReserveMonitor } from '@stsgs/ui/features/scifi-reserve-monitor/scifi-reserve-monitor'
import { ScifiRiskMatrix } from '@stsgs/ui/features/scifi-risk-matrix/scifi-risk-matrix'
import { ScifiRouteTable } from '@stsgs/ui/features/scifi-route-table/scifi-route-table'
import { ScifiSankeyFlow } from '@stsgs/ui/features/scifi-sankey-flow/scifi-sankey-flow'
import { ScifiScrollProgress } from '@stsgs/ui/features/scifi-scroll-progress/scifi-scroll-progress'
import { ScifiScenarioAnalysis } from '@stsgs/ui/features/scifi-scenario-analysis/scifi-scenario-analysis'
import { ScifiScenarioCards } from '@stsgs/ui/features/scifi-scenario-cards/scifi-scenario-cards'
import { ScifiScenarioEngine } from '@stsgs/ui/features/scifi-scenario-engine/scifi-scenario-engine'
import { ScifiSectionHeader } from '@stsgs/ui/features/scifi-section-header/scifi-section-header'
import { ScifiSentimentGauge } from '@stsgs/ui/features/scifi-sentiment-gauge/scifi-sentiment-gauge'
import { ScifiStatsSection } from '@stsgs/ui/features/scifi-stats-section/scifi-stats-section'
import { ScifiTabbedView } from '@stsgs/ui/features/scifi-tabbed-view/scifi-tabbed-view'
import { ScifiTacticalMap } from '@stsgs/ui/features/scifi-tactical-map/tactical-map'
import { ScifiTensionIndex } from '@stsgs/ui/features/scifi-tension-index/scifi-tension-index'
import { ScifiTickerBar } from '@stsgs/ui/features/scifi-ticker-bar/scifi-ticker-bar'
import { ScifiTimeline } from '@stsgs/ui/features/scifi-timeline/scifi-timeline'
import { ScifiTrackedAssets } from '@stsgs/ui/features/scifi-tracked-assets/tracked-assets'
import { ScifiTransitMonitor } from '@stsgs/ui/features/scifi-transit-monitor/scifi-transit-monitor'
import { ScifiTransitOverview } from '@stsgs/ui/features/scifi-transit-overview/scifi-transit-overview'
import { ScifiVersusPanel } from '@stsgs/ui/features/scifi-versus-panel/versus-panel'

// ─── Sections ──────────────────────────────────────────────
import { ThreeColumnBrowser } from '@stsgs/ui/sections/three-column-browser/three-column-browser'
import { FourColumnBrowser } from '@stsgs/ui/sections/four-column-browser/four-column-browser'

// ─── Extended Map ──────────────────────────────────────────

/** All components added in the extended registry pass. */
export const EXTENDED_MAP: Record<string, ComponentType> = {
  // Non-scifi features
  'animated-counter': AnimatedCounter, 'compare-slider': CompareSlider,
  'hud-card': HudCard, 'mini-sparkline': MiniSparkline,
  'search-panel': SearchPanel, 'typing-effect': TypingEffect,
  // Scifi features a-l
  'scifi-actor-grid': ScifiActorGrid, 'scifi-alert-dashboard': ScifiAlertDashboard,
  'scifi-alert-panel': ScifiAlertPanel, 'scifi-asset-heatmap': ScifiAssetHeatmap,
  'scifi-asset-tracker': ScifiAssetTracker, 'scifi-badge': ScifiBadge,
  'scifi-button-group': ScifiButtonGroup, 'scifi-canvas-chart': ScifiCanvasChart,
  'scifi-chain-tracker': ScifiChainTracker, 'scifi-chart-grid': ScifiChartGrid,
  'scifi-comparison-grid': ScifiComparisonGrid, 'scifi-compliance-tracker': ScifiComplianceTracker,
  'scifi-cost-calculator': ScifiCostCalculator, 'scifi-correlation-dashboard': ScifiCorrelationDashboard,
  'scifi-correlation-grid': ScifiCorrelationGrid, 'scifi-correlation-table': ScifiCorrelationTable,
  'scifi-cta-section': ScifiCtaSection, 'scifi-demand-curve': ScifiDemandCurve,
  'scifi-disruption-panel': ScifiDisruptionPanel, 'scifi-energy-dashboard': ScifiEnergyDashboard,
  'scifi-event-calendar': ScifiEventCalendar, 'scifi-forecast-panel': ScifiForecastPanel,
  'scifi-fleet-monitor': ScifiFleetMonitor, 'scifi-flow-tracker': ScifiFlowTracker,
  'scifi-gauge': ScifiGauge,
  'scifi-hero': ScifiHero, 'scifi-impact-beneficiaries': ScifiImpactBeneficiaries,
  'scifi-incident-tracker': ScifiIncidentTracker, 'scifi-indicator-panel': ScifiIndicatorPanel,
  'scifi-infrastructure-map': ScifiInfrastructureMap, 'scifi-level-analysis': ScifiLevelAnalysis,
  'scifi-loading-screen': ScifiLoadingScreen, 'scifi-live-feed': ScifiLiveFeed,
  'scifi-nav-bar': ScifiNavBar, 'scifi-news-feed': ScifiNewsFeed,
  // Scifi features p-z
  'scifi-period-selector': ScifiPeriodSelector, 'scifi-processing-panel': ScifiProcessingPanel,
  'scifi-pulse-meter': ScifiPulseMeter, 'scifi-region-map': ScifiRegionMap,
  'scifi-reserve-monitor': ScifiReserveMonitor, 'scifi-risk-matrix': ScifiRiskMatrix,
  'scifi-route-table': ScifiRouteTable, 'scifi-sankey-flow': ScifiSankeyFlow,
  'scifi-scroll-progress': ScifiScrollProgress, 'scifi-scenario-analysis': ScifiScenarioAnalysis,
  'scifi-scenario-cards': ScifiScenarioCards, 'scifi-scenario-engine': ScifiScenarioEngine,
  'scifi-section-header': ScifiSectionHeader, 'scifi-sentiment-gauge': ScifiSentimentGauge,
  'scifi-stats-section': ScifiStatsSection, 'scifi-tabbed-view': ScifiTabbedView,
  'scifi-tactical-map': ScifiTacticalMap, 'scifi-tension-index': ScifiTensionIndex,
  'scifi-ticker-bar': ScifiTickerBar, 'scifi-timeline': ScifiTimeline,
  'scifi-tracked-assets': ScifiTrackedAssets, 'scifi-transit-monitor': ScifiTransitMonitor,
  'scifi-transit-overview': ScifiTransitOverview, 'scifi-versus-panel': ScifiVersusPanel,
  // Sections
  'three-column-browser': ThreeColumnBrowser, 'four-column-browser': FourColumnBrowser,
}
