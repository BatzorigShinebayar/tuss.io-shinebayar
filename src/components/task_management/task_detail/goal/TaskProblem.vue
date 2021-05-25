<template>
  <div class="lined-card p-3 mb-4">
    <h5 class="font-weight-bold mb-2">Problem and root cause</h5>

    <b-button-group class="mt-3">
      <b-button variant="outline-primary" @click="diagramSave">
        <Fa :icon="['fas', 'save']" />
        Save
      </b-button>
      <b-button variant="outline-primary" @click="diagramLoad">
        <Fa :icon="['fas', 'undo']" />
        Reload
      </b-button>
      <b-button variant="outline-primary" @click="diagramDelete">
        <Fa :icon="['fas', 'times']" />
        Delete
      </b-button>
    </b-button-group>

    <div class="control-section">
      <div id="palette-space" class="sb-mobile-palette">
        <ejs-symbolpalette
          id="symbolpalette"
          :expandMode="'Multiple'"
          :palettes="palettes"
          :getNodeDefaults="palettegetNodeDefaults"
          :symbolMargin="palettesymbolMargin"
          :getSymbolInfo="palettegetSymbolInfo"
          :width="palettewidth"
          :height="paletteheight"
          :symbolHeight="palettesymbolHeight"
          :symbolWidth="palettesymbolWidth"
        />
      </div>
      <div id="diagram-space" class="sb-mobile-diagram">
        <ejs-diagram
          style="display: block"
          ref="diagramObj"
          id="diagram"
          :width="width"
          :height="height"
          :snapSettings="snapSettings"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {
  Diagram,
  DiagramPlugin,
  SymbolPalettePlugin,
  SnapConstraints,
  Snapping,
} from '@syncfusion/ej2-vue-diagrams';
import axios from 'axios';

Vue.use(DiagramPlugin);
Vue.use(SymbolPalettePlugin);
Diagram.Inject(Snapping);

// shapes
let flowshapes = [
  { id: 'Process', shape: { type: 'Flow', shape: 'Process' } },
  {
    id: 'Link1',
    type: 'Orthogonal',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 40, y: 40 },
    targetDecorator: {
      shape: 'Arrow',
      style: { fill: '#757575', strokeColor: '#757575' },
    },
    style: { strokeWidth: 1, strokeColor: '#757575' },
  },
  {
    id: 'Link2',
    type: 'Straight',
    sourcePoint: { x: 0, y: 0 },
    targetPoint: { x: 40, y: 40 },
    targetDecorator: {
      shape: 'Arrow',
      style: { fill: '#757575', strokeColor: '#757575' },
    },
    style: { strokeWidth: 1, strokeColor: '#757575' },
  },
];

export default {
  name: 'TaskProblem',

  data() {
    return {
      width: '100%',
      height: '700px',
      snapSettings: {
        constraints: SnapConstraints.SnapToLines | SnapConstraints.ShowLines,
      },
      palettes: [
        {
          id: 'flow',
          expanded: true,
          symbols: flowshapes,
          iconCss: 'shapes',
          title: '',
        },
      ],
      palettegetNodeDefaults: (symbol) => {
        symbol.style.strokeColor = '#757575';
        if (symbol.id === 'Terminator' || symbol.id === 'Process') {
          symbol.width = 80;
          symbol.height = 40;
        } else if (
          symbol.id === 'Decision' ||
          symbol.id === 'Document' ||
          symbol.id === 'PreDefinedProcess' ||
          symbol.id === 'PaperTap' ||
          symbol.id === 'DirectData' ||
          symbol.id === 'MultiDocument' ||
          symbol.id === 'Data'
        ) {
          symbol.width = 50;
          symbol.height = 40;
        }
        if (symbol.style) symbol.style.strokeWidth = 1;
      },
      palettesymbolMargin: { left: 15, right: 15, top: 15, bottom: 15 },
      palettegetSymbolInfo: () => {
        return { fit: true };
      },
      palettewidth: '85px',
      paletteheight: '700px',
      palettesymbolHeight: 60,
      palettesymbolWidth: 60,
      loadedDiagramData: null,
    };
  },

  inject: ['taskDetail'],

  watch: {
    taskDetail: {
      handler() {
        this.loadedDiagramData = this.taskDetail.object.problem_definition;
        this.diagramLoad();
      },
      deep: true,
    },
  },

  mounted() {
    this.loadedDiagramData = this.taskDetail.object.problem_definition;
    this.diagramLoad();
    this.$refs.diagramObj.ej2Instances.fitToPage();
  },

  methods: {
    diagramLoad() {
      this.$refs.diagramObj.ej2Instances.loadDiagram(
        JSON.stringify(this.loadedDiagramData)
      );
    },

    diagramDelete() {
      this.$refs.diagramObj.ej2Instances.clear();
    },

    diagramSave() {
      const taskId = this.$route.query.id;
      const url = `/pages/plan/task_goal_update/${taskId}/`;
      const data = JSON.parse(this.$refs.diagramObj.ej2Instances.saveDiagram());
      const payload = {
        id: taskId,
        problem_definition: data,
        updated_user: this.$store.getters.user.id,
      };

      axios.post(url, payload).then(() => {
        this.loadedDiagramData = data;
      });
    },
  },
};
</script>

<style scoped>
@import '../../../../../node_modules/@syncfusion/ej2-vue-diagrams/styles/bootstrap4.css';
</style>
