$(run);

function run() {
  view.setupInstructionHandlers(new Execution());
};

class Execution {
  constructor () {
    this.instructions = [0, 1, 2, 3, 4, 5, 8, 9, 10, 11,
                         6, 7, 3, 4, 5, 8, 9, 10, 11,
                         6, 7, 3, 4, 5, 8, 9, 10, 11,
                         6, 7, 3, 4, 5];
    this.iLastExecutedInstruction = -1;
  }

  checkStep (event) {
    if (this.isComplete()) {
      return;
    }

    const clickedInstruction = view.instruction(event);

    if (clickedInstruction !== this.nextInstruction()) {
      view.markWrong(clickedInstruction);
      return;
    }

    this.iLastExecutedInstruction++;
    view.markCurrent(clickedInstruction);

    if (this.isComplete()) {
      view.complete();
    }
  }

  nextInstruction () {
    return this.instructions[this.iLastExecutedInstruction + 1];
  }

  isComplete () {
    return this.iLastExecutedInstruction ===
      this.instructions.length - 1;
  }
};

let view = {
  instruction: function(event) {
    return parseInt(event.target.classList.value.match(/i-(\d+)/)[1]);
  },

  markCurrent: function (id) {
    $(".ins").removeClass("wrong");
    $(".ins").removeClass("current");
    $(`.i-${id}`).addClass("current");
  },

  markWrong: function (id) {
    $(".ins").removeClass("wrong");
    $(`.i-${id}`).addClass("wrong");
  },

  setupInstructionHandlers: function(execution) {
    $(".ins").click(execution.checkStep.bind(execution));
  },

  complete: function() {
    $(`#complete`).show();
  }
};
