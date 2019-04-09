import { TipModel } from '@shared/models/mind/TipModel'
import { DailyBudgetMeta } from './DailyBudgetMeta'

interface Props {
  tip: TipModel<DailyBudgetMeta>
}

export const DailyBudget = ({ tip }: Props) => {
  return <div> todays budget is {tip.meta}</div>
}
