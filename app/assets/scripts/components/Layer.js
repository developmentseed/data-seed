import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ShowChart from '@material-ui/icons/ShowChart';
import Widgets from '@material-ui/icons/Widgets';
import ScatterPlot from '@material-ui/icons/ScatterPlot';

import { SetActiveLayer, ZoomToLayer } from '../actions/LayerActions';
import { HideShowLayers } from '../actions/LayersActions';

class Layer extends Component {
  constructor(props) {
    super(props);
    this.zoomToLayer = this.zoomToLayer.bind(this);
    this.hideOrShowLayer = this.hideOrShowLayer.bind(this);
  }

  /**
   * Set active a layer, it will zoom to the layer and display properties
   */
  zoomToLayer() {
    const layer = this.props.layer;
    this.props.ZoomToLayer(layer.bbox);
  }

  /**
   *
   */
  hideOrShowLayer() {
    let layers = this.props.layers;
    const layer = this.props.layer;
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].id === layer.id) {
        layers[i].showLayer = !layers[i].showLayer;
      }
    }
    this.props.HideShowLayers(layers);
  }

  typeIcon(display) {
    const style = { color: this.props.layer.color, width: '16px' };
    if (display === 'line') {
      return <ShowChart style={style} />;
    } else if (display === 'point') {
      return <ScatterPlot style={style} />;
    } else {
      return <Widgets style={style} />;
    }
  }
  render() {
    // const

    return (
      <ListItem onClick={this.zoomToLayer}>
        <ListItemIcon>{this.typeIcon(this.props.layer.display)}</ListItemIcon>
        <ListItemText style={{ paddingLeft: '1px', paddingRight: '1px' }} primary={this.props.layer.name} />
        <ListItemSecondaryAction>
          <label htmlFor={this.props.layer.id} className="form__option form__option--switch">
            <input
              type="checkbox"
              name={this.props.layer.id}
              id={this.props.layer.id}
              defaultChecked={this.props.layer.showLayer}
              onChange={this.hideOrShowLayer}
            />
            <span
              className="form__option__ui"
              style={{
                width: '2.3rem',
                height: '1rem'
              }}
            />
          </label>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

Layer.propTypes = {
  layers: PropTypes.array.isRequired,
  layer: PropTypes.object.isRequired,
  SetActiveLayer: PropTypes.func.isRequired,
  ZoomToLayer: PropTypes.func.isRequired,
  HideShowLayers: PropTypes.func.isRequired
};

function mapStateToPops(state, ownProps) {
  return {
    layers: state.layers
  };
}
const mapDispatchToProps = {
  SetActiveLayer,
  ZoomToLayer,
  HideShowLayers
};

export default connect(
  mapStateToPops,
  mapDispatchToProps
)(Layer);
