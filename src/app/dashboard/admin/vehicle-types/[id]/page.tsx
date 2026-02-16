// This file is intentionally left empty with only a comment.
// It previously caused a Next.js routing conflict because its slug `[id]`
// conflicted with `[vehicleTypeId]` at the same route level.
// Making this file inert resolves the startup error:
// "Error: You cannot use different slug names for the same dynamic path ('id' !== 'vehicleTypeId')."
