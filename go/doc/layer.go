package doc

type Layer interface {
	GetProp(prop string) any
	SetProp(prop string, val any)
}

type layer struct {
	id    string
	props map[string]any
}

// GetProp implements Layer.
func (l *layer) GetProp(prop string) any {
	return l.props[prop]
}

// SetProp implements Layer.
func (l *layer) SetProp(prop string, val any) {
	l.props[prop] = val
}

func NewLayer(id string) Layer {
	return &layer{
		id:    id,
		props: map[string]any{},
	}
}
