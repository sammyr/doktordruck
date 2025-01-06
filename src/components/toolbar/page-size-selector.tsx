import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import paperSizes from '@/data/paper-sizes.json'

interface PageSizeSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function PageSizeSelector({ value, onChange }: PageSizeSelectorProps) {
  const allSizes = [
    ...paperSizes.poster.portrait.map(size => ({
      id: size.id,
      name: size.name,
      type: 'Hochkant'
    })),
    ...paperSizes.poster.landscape.map(size => ({
      id: size.id,
      name: size.name,
      type: 'Querformat'
    }))
  ]

  return (
    <div className="space-y-2">
      <Label htmlFor="pageSize">Postergröße</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Wähle eine Größe" />
        </SelectTrigger>
        <SelectContent>
          <div className="space-y-1">
            <div className="px-2 py-1.5 text-sm font-semibold">Hochkant</div>
            {allSizes
              .filter(size => size.type === 'Hochkant')
              .map(size => (
                <SelectItem key={size.id} value={size.id}>
                  {size.name}
                </SelectItem>
              ))}
            <div className="px-2 py-1.5 text-sm font-semibold">Querformat</div>
            {allSizes
              .filter(size => size.type === 'Querformat')
              .map(size => (
                <SelectItem key={size.id} value={size.id}>
                  {size.name}
                </SelectItem>
              ))}
          </div>
        </SelectContent>
      </Select>
    </div>
  )
}
